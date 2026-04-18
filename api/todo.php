<?php
session_start();
require_once '../config/database.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Non autorisé"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Get action from URL
$action = $_GET['action'] ?? '';

// For POST requests, get the JSON body
$input = json_decode(file_get_contents('php://input'), true);

switch ($action) {
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$user_id]);
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tasks);
        break;

    case 'add':
        $task_text = trim($input['task_text'] ?? '');
        $priority = $input['priority'] ?? 'moyenne';

        if ($task_text === '') {
            echo json_encode(["success" => false, "error" => "Texte vide"]);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO todos (user_id, task_text, priority) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $task_text, $priority]);
        $id = $pdo->lastInsertId();
        
        echo json_encode(["success" => true, "id" => $id]);
        break;

    case 'update':
        $id = $input['id'] ?? null;
        $is_completed = isset($input['is_completed']) ? (int)$input['is_completed'] : 0;

        if ($id) {
            $stmt = $pdo->prepare("UPDATE todos SET is_completed = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$is_completed, $id, $user_id]);
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "ID manquant"]);
        }
        break;

    case 'delete':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM todos WHERE id = ? AND user_id = ?");
            $stmt->execute([$id, $user_id]);
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "ID manquant"]);
        }
        break;

    default:
        echo json_encode(["success" => false, "error" => "Action inconnue"]);
        break;
}
?>
