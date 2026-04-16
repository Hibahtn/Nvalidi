<?php
session_start();
require_once '../config/database.php';

$body = json_decode(file_get_contents("php://input"), true);
$action = $body['action'] ?? '';

// ── REGISTER ──
if ($action === 'register') {
    $nom   = trim($body['nom'] ?? '');
    $email = trim($body['email'] ?? '');
    $pass  = $body['password'] ?? '';

    if (!$nom || !$email || !$pass) {
        echo json_encode(["error" => "Champs manquants"]);
        exit;
    }

    // Vérifier si email existe déjà
    $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);
    if ($check->fetch()) {
        echo json_encode(["error" => "Email déjà utilisé"]);
        exit;
    }

    $hash = password_hash($pass, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (nom, email, mot_de_passe) VALUES (?, ?, ?)");
    $stmt->execute([$nom, $email, $hash]);

    echo json_encode(["success" => true, "message" => "Compte créé !"]);
    exit;
}

// ── LOGIN ──
if ($action === 'login') {
    $email = trim($body['email'] ?? '');
    $pass  = $body['password'] ?? '';

    if (!$email || !$pass) {
        echo json_encode(["error" => "Champs manquants"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($pass, $user['mot_de_passe'])) {
        echo json_encode(["error" => "Email ou mot de passe incorrect"]);
        exit;
    }

    // Créer la session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['nom']     = $user['nom'];
    $_SESSION['email']   = $user['email'];

    echo json_encode(["success" => true, "nom" => $user['nom']]);
    exit;
}

// ── LOGOUT ──
if ($action === 'logout') {
    session_destroy();
    echo json_encode(["success" => true]);
    exit;
}
?>