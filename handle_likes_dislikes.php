<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  echo json_encode(['success' => false, 'message' => 'Vous devez être connecté pour liker ou disliker.']);
  exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "root";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Activer le rapport d'erreurs
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
  $user_id = $_SESSION['user_id'];
  $comment_id = isset($_POST['comment_id']) ? intval($_POST['comment_id']) : 0;
  $type = isset($_POST['type']) ? $_POST['type'] : '';

  if ($comment_id > 0 && ($type === 'like' || $type === 'dislike')) {
    // Vérifier si l'utilisateur a déjà liké ou disliké le commentaire
    $sql_check = "SELECT type FROM comments_likes WHERE comment_id = $comment_id AND user_id = $user_id";
    $result_check = $conn->query($sql_check);

    if ($result_check->num_rows > 0) {
      // Mettre à jour le like/dislike existant
      $row = $result_check->fetch_assoc();
      if ($row['type'] !== $type) {
        $sql_update = "UPDATE comments_likes SET type = '$type' WHERE comment_id = $comment_id AND user_id = $user_id";
        if ($conn->query($sql_update) === TRUE) {
          echo json_encode(['success' => true, 'message' => 'Mise à jour réussie.']);
        } else {
          echo json_encode(['success' => false, 'message' => 'Erreur de mise à jour : ' . $conn->error]);
        }
      } else {
        echo json_encode(['success' => true, 'message' => 'Aucune modification nécessaire.']);
      }
    } else {
      // Ajouter un nouveau like/dislike
      $sql_insert = "INSERT INTO comments_likes (comment_id, user_id, type) VALUES ($comment_id, $user_id, '$type')";
      if ($conn->query($sql_insert) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Ajout réussi.']);
      } else {
        echo json_encode(['success' => false, 'message' => 'Erreur d\'ajout : ' . $conn->error]);
      }
    }
  } else {
    echo json_encode(['success' => false, 'message' => 'Données invalides.']);
  }
} catch (mysqli_sql_exception $e) {
  echo json_encode(['success' => false, 'message' => 'Erreur SQL : ' . $e->getMessage()]);
}

$conn->close();
?>
