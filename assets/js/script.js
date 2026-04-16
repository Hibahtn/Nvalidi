// ── DÉCONNEXION ──
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.logout-link');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await fetch('../api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'logout' })
            });
            window.location.href = '../public/acceuil.html';
        });
    }
});