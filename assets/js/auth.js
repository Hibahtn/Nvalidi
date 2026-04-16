window.onload = function() {
    
    // ── LOGIN ──
    const loginBtn = document.getElementById('loginSubmitBtn');
    if (loginBtn) {
        loginBtn.onclick = async function() {
            const email    = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert("Veuillez remplir tous les champs !");
                return;
            }

            try {
                const res  = await fetch('../api/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'login', email, password })
                });
                const data = await res.json();

                if (data.success) {
                    window.location.href = 'dashboard.html';
                } else {
                    alert("❌ " + data.error);
                }
            } catch (e) {
                alert("❌ Erreur de connexion au serveur");
            }
        };
    }

    // ── REGISTER ──
    const registerBtn = document.getElementById('registerSubmitBtn');
    if (registerBtn) {
        registerBtn.onclick = async function() {
            const nom      = document.getElementById('name').value.trim();
            const email    = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirm  = document.getElementById('confirm-password').value;

            if (!nom || !email || !password || !confirm) {
                alert("Veuillez remplir tous les champs !");
                return;
            }

            if (password !== confirm) {
                alert("❌ Les mots de passe ne correspondent pas !");
                return;
            }

            if (password.length < 8) {
                alert("❌ Le mot de passe doit faire au moins 8 caractères !");
                return;
            }

            try {
                const res  = await fetch('../api/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'register', nom, email, password })
                });
                const data = await res.json();

                if (data.success) {
                    alert("✅ Compte créé avec succès ! Connectez-vous maintenant.");
                    window.location.href = 'login.html';
                } else {
                    alert("❌ " + data.error);
                }
            } catch (e) {
                alert("❌ Erreur de connexion au serveur");
            }
        };
    }
};