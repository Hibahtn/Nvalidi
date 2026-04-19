<?php
session_start();
require_once '../config/database.php';

// Vérifier que l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Non authentifié"]);
    exit;
}

$user_id = $_SESSION['user_id']; // ← récupère le vrai user connecté

$method = $_SERVER['REQUEST_METHOD'];

// ── GET : charger les notes d'un niveau ──
if ($method === 'GET') {
    $niveau = $_GET['niveau'] ?? '';
    if (!$niveau) {
        echo json_encode(["error" => "niveau manquant"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT field_id, valeur FROM notes WHERE user_id = ? AND niveau = ?");
    $stmt->execute([$user_id, $niveau]);
    $rows = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    echo json_encode($rows);
    exit;
}

// ── POST : sauvegarder les notes ──
if ($method === 'POST') {
    $body = json_decode(file_get_contents("php://input"), true);
    $niveau = $body['niveau'] ?? '';
    $notes  = $body['notes'] ?? [];
    $moyenne = $body['moyenne'] ?? null;

    if (!$niveau) {
        echo json_encode(["error" => "données manquantes"]);
        exit;
    }

    // ← Supprimer toutes les notes de ce niveau d'abord
    $stmtDel = $pdo->prepare("DELETE FROM notes WHERE user_id = ? AND niveau = ?");
    $stmtDel->execute([$user_id, $niveau]);

    // ← Réinsérer seulement les champs non vides
    if (!empty($notes)) {
        $stmt = $pdo->prepare("
            INSERT INTO notes (user_id, niveau, field_id, valeur)
            VALUES (?, ?, ?, ?)
        ");
        foreach ($notes as $field_id => $valeur) {
            $stmt->execute([$user_id, $niveau, $field_id, $valeur]);
        }
    }

    // Sauvegarder la moyenne
    if ($moyenne !== null) {
        $stmt2 = $pdo->prepare("
            INSERT INTO moyennes_calculees (user_id, niveau, moyenne)
            VALUES (?, ?, ?)
        ");
        $stmt2->execute([$user_id, $niveau, $moyenne]);
    }

    echo json_encode(["success" => true]);
    exit;
}
?>