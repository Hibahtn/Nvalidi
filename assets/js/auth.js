window.onload = function() {
    // PARTIE LOGIN 
    const loginBtn = document.getElementById('loginSubmitBtn');
    if (loginBtn) {
        loginBtn.onclick = function() {
            const email = document.querySelector('input[type="email"]').value;
            const pass = document.querySelector('input[type="password"]').value;
            if (email !== "" && pass !== "") {
                window.location.href = "../public/dashboard.html";
            } else {
                alert("Veuillez remplir tous les champs !");
            }
        };
    }
    // PARTIE REGISTER
    const registerBtn = document.getElementById('registerSubmitBtn');
    if (registerBtn) {
        registerBtn.onclick = function() {
            const name = document.querySelector('input[placeholder*="Nom"]').value;
            
            if (name !== "") {
                alert("Compte créé avec succès ! Connectez-vous maintenant.");
                window.location.href = "../public/login.html";
            } else {
                alert("Veuillez entrer votre nom complet.");
            }
        };
    }
};