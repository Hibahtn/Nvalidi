window.onload = function() {
    console.log("Système de paramètres initialisé...");

    // Bouton Enregistrer Profil
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    
    if (saveProfileBtn) {
        saveProfileBtn.onclick = function() {
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const level = document.getElementById('userLevel').value;

            if (name.trim() === "" || email.trim() === "") {
                alert("Erreur : Les champs Nom et Email sont obligatoires.");
                return;
            }

            // Feedback visuel de succès
            alert("Succès : Les informations pour " + name + " ont été mises à jour !");
            saveProfileBtn.innerHTML = "Enregistré ! ✅";
            saveProfileBtn.style.background = "#2ecc71"; // Vert succès
            saveProfileBtn.style.color = "#fff";

            // Retour à l'état normal après 2 secondes
            setTimeout(() => {
                saveProfileBtn.innerHTML = "Enregistrer les modifications";
                saveProfileBtn.style.background = ""; 
                saveProfileBtn.style.color = "";
            }, 2000);
        };
    }

    // Bouton Mettre à jour Mot de Passe
    const savePassBtn = document.getElementById('savePassBtn');
    if (savePassBtn) {
        savePassBtn.onclick = function() {
            const newPassword = document.getElementById('newPassword').value;

            if (newPassword.length < 8) {
                alert("Sécurité : Le mot de passe doit faire au moins 8 caractères.");
            } else {
                alert("Sécurité : Votre mot de passe a été modifié avec succès !");
                document.getElementById('newPassword').value = ""; // Vide le champ
            }
        };
    }
};