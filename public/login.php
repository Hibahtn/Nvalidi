<?php
require_once '../includes/header.php';
?>

<h2>Login</h2>
<form method="POST" action="../api/login.php">
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Login</button>
</form>

<?php require_once '../includes/footer.php'; ?>
