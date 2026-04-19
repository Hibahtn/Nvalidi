<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Non authentifié"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$action = $_GET['action'] ?? '';

switch ($action) {

    case 'last_moyenne':
        $stmt = $pdo->prepare("
            SELECT niveau, moyenne, calculated_at 
            FROM moyennes_calculees 
            WHERE user_id = ? 
            ORDER BY calculated_at DESC 
            LIMIT 1
        ");
        $stmt->execute([$user_id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result ?: ["moyenne" => null]);
        break;

    case 'best_moyenne':
        $stmt = $pdo->prepare("
            SELECT niveau, moyenne 
            FROM moyennes_calculees 
            WHERE user_id = ? 
            ORDER BY moyenne DESC 
            LIMIT 1
        ");
        $stmt->execute([$user_id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result ?: ["moyenne" => null]);
        break;

    case 'notes_faibles':
        $stmt = $pdo->prepare("
            SELECT niveau, field_id, valeur 
            FROM notes 
            WHERE user_id = ? AND valeur < 10
            ORDER BY valeur ASC
        ");
        $stmt->execute([$user_id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    default:
        echo json_encode(["error" => "Action inconnue"]);
        break;
}
?>