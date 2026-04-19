<?php
session_start();
require_once '../config/database.php';
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Non autorisé"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$action = $_GET['action'] ?? '';
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

        $stmt = $pdo->prepare("INSERT INTO todos (user_id, task_text, priority, status) VALUES (?, ?, ?, 'a_faire')");
        $stmt->execute([$user_id, $task_text, $priority]);
        $id = $pdo->lastInsertId();
        
        echo json_encode(["success" => true, "id" => $id]);
        break;

    case 'update':
        $id = $input['id'] ?? null;
        $status = $input['status'] ?? null;

        if ($id && $status) {
            $is_completed = ($status === 'termine') ? 1 : 0;
            $stmt = $pdo->prepare("UPDATE todos SET status = ?, is_completed = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$status, $is_completed, $id, $user_id]);
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Données manquantes"]);
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

    case 'update_priority':
        $id = $input['id'] ?? null;
        $priority = $input['priority'] ?? null;

        if ($id && $priority) {
            $stmt = $pdo->prepare("UPDATE todos SET priority = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$priority, $id, $user_id]);
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Données manquantes"]);
        }
        break;

    case 'stats':
        $stmt = $pdo->prepare("
            SELECT 
                COUNT(*) as total,
                SUM(status = 'a_faire') as a_faire,
                SUM(status = 'en_cours') as en_cours,
                SUM(status = 'termine') as termine
            FROM todos 
            WHERE user_id = ?
        ");
        $stmt->execute([$user_id]);
        $stats = $stmt->fetch(PDO::FETCH_ASSOC);
        $total = $stats['total'] > 0 ? $stats['total'] : 1;
        $stats['progression'] = round(($stats['termine'] / $total) * 100);
        
        echo json_encode($stats);
        break;

    default:
        echo json_encode(["success" => false, "error" => "Action inconnue"]);
        break;
}
?>