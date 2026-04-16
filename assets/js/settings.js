window.onload = async function() {

    // ── CHARGER les infos de l'utilisateur ──
    try {
        const res  = await fetch('../api/user.php');
        const user = await res.json();

        if (user.error) {
            alert("❌ " + user.error);
            return;
        }

        // Remplir les champs
        document.getElementById('userName').value  = user.nom;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userLevel').value = user.niveau || 'L1';

    } catch (e) {
        console.error("❌ Erreur chargement:", e);
    }

    // ── MODIFIER LE PROFIL ──
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.onclick = async function() {
            const nom    = document.getElementById('userName').value.trim();
            const email  = document.getElementById('userEmail').value.trim();
            const niveau = document.getElementById('userLevel').value;

            if (!nom || !email) {
                alert("❌ Les champs Nom et Email sont obligatoires.");
                return;
            }

            try {
                const res  = await fetch('../api/user.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'update_profile', nom, email, niveau })
                });
                const data = await res.json();

                if (data.success) {
                    saveProfileBtn.innerHTML = "Enregistré ! ✅";
                    saveProfileBtn.style.background = "#2ecc71";
                    saveProfileBtn.style.color = "#fff";
                    setTimeout(() => {
                        saveProfileBtn.innerHTML = "Enregistrer les modifications";
                        saveProfileBtn.style.background = "";
                        saveProfileBtn.style.color = "";
                    }, 2000);
                } else {
                    alert("❌ " + data.error);
                }
            } catch (e) {
                alert("❌ Erreur serveur");
            }
        };
    }

    // ── MODIFIER LE MOT DE PASSE ──
    const savePassBtn = document.getElementById('savePassBtn');
    if (savePassBtn) {
        savePassBtn.onclick = async function() {
            const current = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;

            if (!current || !newPass) {
                alert("❌ Remplissez les deux champs mot de passe !");
                return;
            }

            if (newPass.length < 8) {
                alert("❌ Le nouveau mot de passe doit faire au moins 8 caractères !");
                return;
            }

            try {
                const res  = await fetch('../api/user.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'update_password', current_password: current, new_password: newPass })
                });
                const data = await res.json();

                if (data.success) {
                    alert("✅ Mot de passe modifié avec succès !");
                    document.getElementById('currentPassword').value = '';
                    document.getElementById('newPassword').value = '';
                } else {
                    alert("❌ " + data.error);
                }
            } catch (e) {
                alert("❌ Erreur serveur");
            }
        };
    }
};