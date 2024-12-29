<?php
// Connexion à la base de données
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
  // Récupérer tous les commentaires avec les informations des utilisateurs, likes et dislikes
  $sql_comments = "SELECT comments.idc AS comment_id, comments.user_id, comments.comment, comments.created_at, users.username, users.field,
                   (SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comment_id = comments.idc AND comments_likes.type = 'like') AS likes,
                   (SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comment_id = comments.idc AND comments_likes.type = 'dislike') AS dislikes
                   FROM comments
                   JOIN users ON comments.user_id = users.id
                   ORDER BY comments.created_at DESC";

  $result_comments = $conn->query($sql_comments);

  $comments = [];
  if ($result_comments->num_rows > 0) {
    while ($row = $result_comments->fetch_assoc()) {
      $comments[] = $row;
    }
  }

  // Deuxième fonctionnalité : Récupérer les commentaires avec les utilisateurs et le texte du commentaire
  $sql_basic_comments = "SELECT users.username, users.field, comments.comment 
                         FROM comments 
                         JOIN users ON comments.user_id = users.id 
                         ORDER BY comments.created_at DESC";

  $result_basic_comments = $conn->query($sql_basic_comments);

  $basic_comments = [];
  if ($result_basic_comments->num_rows > 0) {
    while ($row = $result_basic_comments->fetch_assoc()) {
      $basic_comments[] = $row;
    }
  }

  // Préparer le résultat final à renvoyer
  $final_result = [
    'detailed_comments' => $comments,
    'basic_comments' => $basic_comments,
  ];

  echo json_encode($final_result);
} catch (mysqli_sql_exception $e) {
  echo "Erreur SQL : " . $e->getMessage();
}

$conn->close();
?>
