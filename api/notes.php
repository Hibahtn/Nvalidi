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

    if (!$niveau || empty($notes)) {
        echo json_encode(["error" => "données manquantes"]);
        exit;
    }

    $stmt = $pdo->prepare("
        INSERT INTO notes (user_id, niveau, field_id, valeur)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE valeur = VALUES(valeur)
    ");

    foreach ($notes as $field_id => $valeur) {
        $stmt->execute([$user_id, $niveau, $field_id, $valeur]);
    }

    echo json_encode(["success" => true]);
    exit;
}
?>