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
            return td * 0.1 + ds * 0.2 + ex * 0.7;
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

            let semSum = 0;
            let semCoef = 0;
            let semCredits = 0;

            sem.modules.forEach(mod => {

                let modSum = 0;
                let modCoef = 0;
                let modCredits = 0;

                mod.matieres.forEach(mat => {

                    let moy = calcMat(mat);

                    setText(mat.moyId, fmt(moy), moy >= 10 ? "green" : "red");

                    modSum += moy * mat.coef;
                    modCoef += mat.coef;

                    if (moy >= 10) {
                        setText(mat.crId, mat.credit);
                    } else {
                        setText(mat.crId, 0);
                    }
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

            results.semesters.push({
                label: sem.label,
                moy: semMoy,
                credits: semCredits
            });
        });

        return results;
    };

    // AFFICHAGE SIMPLE SOUS TABLEAUX
    const showResults = (res) => {

    const box = document.getElementById("resultats");

    const s1 = res.semesters[0];
    const s2 = res.semesters[1];

    
    if (!s1 || !s2) return;

    const moyGen = (s1.moy + s2.moy) / 2;
    const totalCr = s1.credits + s2.credits;

    box.innerHTML = `
        <h2 style="text-align:center;">📊 Résultats</h2>

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
        <h1 style="text-align:center; color:#0984e3;">
            ${fmt(moyGen)}
        </h1>

        <h3 style="text-align:center;">Total Crédits</h3>
        <h2 style="text-align:center; color:green;">
            ${totalCr} / 60
        </h2>
    `;
};

    return {
        init: (config) => {

            document.querySelectorAll(".input-note").forEach(input => {
                input.addEventListener("input", () => run(config));
            });

            document.querySelector(".btn-calcul")
                .addEventListener("click", () => {
                    const res = run(config);
                    showResults(res);
                });
        }
    };

})();