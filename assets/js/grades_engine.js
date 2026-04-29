const GradesEngine = (() => {

    const fmt = (v) => (v !== null ? v.toFixed(2) : '-');

    const getVal = (id) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        let val = parseFloat(el.value);
        if (isNaN(val)) return 0;
        return Math.min(20, Math.max(0, val));
    };

    const setText = (id, val, color = '') => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = val;
        el.style.color = color;
    };

    const calcMat = (mat) => {
        const ex = getVal(mat.exId);
        if (mat.tdId && mat.dsId) {
            const td = getVal(mat.tdId);
            const ds = getVal(mat.dsId);
            const wTD = mat.wTD ?? 0.1;
            const wDS = mat.wDS ?? 0.2;
            return td * wTD + ds * wDS + ex * (1 - wTD - wDS);
        }
        if (mat.dsId) {
            const ds = getVal(mat.dsId);
            return ds * 0.2 + ex * 0.8;
        }
        return ex;
    };

    const run = (config) => {
        let results = { semesters: [] };
        config.semesters.forEach(sem => {
            let semSum = 0, semCoef = 0, semCredits = 0;
            sem.modules.forEach(mod => {
                let modSum = 0, modCoef = 0;
                mod.matieres.forEach(mat => {
                    let moy = calcMat(mat);
                    setText(mat.moyId, fmt(moy), moy >= 10 ? "green" : "red");
                    modSum += moy * mat.coef;
                    modCoef += mat.coef;
                    setText(mat.crId, moy >= 10 ? mat.credit : 0);
                });
                let modMoy = modSum / modCoef;
                setText(mod.moyId, fmt(modMoy), modMoy >= 10 ? "green" : "red");
                let modCr = modMoy >= 10 ? mod.credit : 0;
                setText(mod.crId, modCr);
                semSum += modMoy * mod.coef;
                semCoef += mod.coef;
                semCredits += modCr;
            });
            let semMoy = semSum / semCoef;
            results.semesters.push({ label: sem.label, moy: semMoy, credits: semCredits });
        });
        return results;
    };

    const showResults = (res) => {
        const box = document.getElementById("resultats");
        if (!box) return null;
        const s1 = res.semesters[0];
        const s2 = res.semesters[1];
        if (!s1 || !s2) return null;
        const moyGen = (s1.moy + s2.moy) / 2;
        const totalCr = s1.credits + s2.credits;
        box.innerHTML = `
            <h2 style="text-align:center;"><i class="fas fa-calculator"></i> Résultats</h2>
            <div style="display:flex; justify-content:space-around; margin-top:15px;">
                <div>
                    <h3>${s1.label}</h3>
                    <p>Moyenne: <strong>${fmt(s1.moy)}</strong></p>
                    <p>Crédits: <strong>${s1.credits}</strong></p>
                </div>
                <div>
                    <h3>${s2.label}</h3>
                    <p>Moyenne: <strong>${fmt(s2.moy)}</strong></p>
                    <p>Crédits: <strong>${s2.credits}</strong></p>
                </div>
            </div>
            <hr style="margin:15px 0;">
            <h3 style="text-align:center;">Moyenne Générale</h3>
            <h1 style="text-align:center; color:#0984e3;">${fmt(moyGen)}</h1>
            <h3 style="text-align:center;">Total Crédits</h3>
            <h2 style="text-align:center; color:green;">${totalCr} / 60</h2>
        `;
        return moyGen;
    };

    const collectNotes = () => {
        const notes = {};
        document.querySelectorAll(".input-note").forEach(input => {
            if (input.id && input.value.trim() !== '') {  // ← ignorer les champs vides
                notes[input.id] = parseFloat(input.value);
            }
        });
        return notes;
    };

    const sauvegarder = async (niveau, moyenne) => {
        const notes = collectNotes();
        try {
            const res = await fetch('../api/notes.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niveau, notes, moyenne })
            });
            const data = await res.json();
            if (data.success) {
                console.log("✅ Notes et moyenne sauvegardées");
            }
        } catch (e) {
            console.error("❌ Erreur sauvegarde:", e);
        }
    };

    const charger = async (niveau, config, onData) => {
        try {
            const res = await fetch(`../api/notes.php?niveau=${niveau}`);
            const data = await res.json();
            Object.entries(data).forEach(([field_id, valeur]) => {
                const el = document.getElementById(field_id);
                if (el) el.value = valeur;
            });
            if (Object.keys(data).length > 0) {
                onData();
                const results = run(config);
                showResults(results);
            }
        } catch (e) {
            console.error("❌ Erreur chargement:", e);
        }
    };

    return {
        init: (config, niveau) => {

            let dejaClique = false;

            charger(niveau, config, () => { dejaClique = true; });

            document.querySelectorAll(".input-note").forEach(input => {
                input.addEventListener("input", () => {
                    const results = run(config);
                    if (dejaClique) showResults(results);
                });
            });

            document.querySelector(".btn-calcul")
                .addEventListener("click", () => {
                    dejaClique = true;
                    const res = run(config);
                    const moyGen = showResults(res);  // ← récupérer la moyenne
                    sauvegarder(niveau, moyGen);      // ← envoyer la moyenne
                });
        }
    };

})();