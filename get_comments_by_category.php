<?php
header('Content-Type: application/json');

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "root"; // Nom de la base de données

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$category_id = isset($_GET['category_id']) ? $_GET['category_id'] : null;

if (!$category_id) {
  die(json_encode(['error' => 'Invalid category ID']));
}

// Récupérer les mots-clés pour la catégorie sélectionnée
$sql_keywords = "SELECT idk FROM keywords WHERE category_id = '$category_id'";
$result_keywords = $conn->query($sql_keywords);

$keyword_ids = [];
if ($result_keywords->num_rows > 0) {
  while ($row = $result_keywords->fetch_assoc()) {
    $keyword_ids[] = $row['idk'];
  }
}

if (!empty($keyword_ids)) {
  $keyword_ids_str = implode(",", $keyword_ids);

  // Récupérer les commentaires liés aux mots-clés
  $sql_comments = "
    SELECT users.username, users.field AS userField, comments.comment
    FROM comments
    JOIN users ON comments.user_id = users.id
    JOIN comments_keywords ON comments.id = comments_keywords.comment_id
    WHERE comments_keywords.keyword_id IN ($keyword_ids_str)
    GROUP BY comments.id
    ORDER BY comments.created_at DESC
  ";

  $result_comments = $conn->query($sql_comments);

  $comments = [];
  if ($result_comments->num_rows > 0) {
    while ($row = $result_comments->fetch_assoc()) {
      $comments[] = $row;
    }
  }

  echo json_encode($comments);
} else {
  echo json_encode([]);
}

$conn->close();
?>
