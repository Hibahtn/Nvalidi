<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Non connecté"]);
    exit;
}
$user_id = $_SESSION['user_id'];

$method = $_SERVER['REQUEST_METHOD'];

// ── GET : charger les infos de l'utilisateur ──
if ($method === 'GET') {
    $stmt = $pdo->prepare("SELECT id, nom, email, niveau, created_at FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["error" => "Utilisateur non trouvé"]);
        exit;
    }

    echo json_encode($user);
    exit;
}

// ── POST : modifier les infos ──
if ($method === 'POST') {
    $body   = json_decode(file_get_contents("php://input"), true);
    $action = $body['action'] ?? '';

    // Modifier profil
    if ($action === 'update_profile') {
        $nom    = trim($body['nom'] ?? '');
        $email  = trim($body['email'] ?? '');
        $niveau = trim($body['niveau'] ?? '');

        if (!$nom || !$email) {
            echo json_encode(["error" => "Champs manquants"]);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE users SET nom = ?, email = ?, niveau = ? WHERE id = ?");
        $stmt->execute([$nom, $email, $niveau, $user_id]);
        echo json_encode(["success" => true]);
        exit;
    }

    // Modifier mot de passe
    if ($action === 'update_password') {
        $current = $body['current_password'] ?? '';
        $new     = $body['new_password'] ?? '';

        if (strlen($new) < 8){
            echo json_encode(["error" => "Mot de passe trop court"]);
            exit;
        }

        // Vérifier mot de passe actuel
        $stmt = $pdo->prepare("SELECT mot_de_passe FROM users WHERE id = ?");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!password_verify($current, $user['mot_de_passe'])) {
            echo json_encode(["error" => "Mot de passe actuel incorrect"]);
            exit;
        }

        $hash = password_hash($new, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("UPDATE users SET mot_de_passe = ? WHERE id = ?");
        $stmt->execute([$hash, $user_id]);
        echo json_encode(["success" => true]);
        exit;
    }
}
?>