<?php
require '../config/database.php';

$action = $_GET['action'] ?? '';

switch ($action) {

    case 'get':
        $user_id = $_GET['user_id'] ?? 1;
        $stmt = $pdo->prepare("SELECT * FROM flashcards WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$user_id]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'create':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("INSERT INTO flashcards (user_id, matiere, question, reponse) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['user_id'], $data['matiere'], $data['question'], $data['reponse']]);
        echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
        break;

    case 'update':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE flashcards SET matiere=?, question=?, reponse=? WHERE id=?");
        $stmt->execute([$data['matiere'], $data['question'], $data['reponse'], $data['id']]);
        echo json_encode(["success" => true]);
        break;

    case 'delete':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("DELETE FROM flashcards WHERE id=?");
        $stmt->execute([$data['id']]);
        echo json_encode(["success" => true]);
        break;

    default:
        http_response_code(400);
        echo json_encode(["error" => "Action invalide"]);
}
?>