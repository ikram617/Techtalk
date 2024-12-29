<?php
header('Content-Type: application/json');

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "root";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : 0;

if ($category_id > 0) {
  // Récupérer les mots-clés pour la catégorie sélectionnée
  $sql_keywords = "SELECT keyword FROM keywords WHERE category_id = '$category_id'";
  $result_keywords = $conn->query($sql_keywords);

  $keywords = [];
  if ($result_keywords->num_rows > 0) {
    while ($row = $result_keywords->fetch_assoc()) {
      $keywords[] = $row['keyword'];
    }
  }

  $comments = [];
  if (!empty($keywords)) {
    $keywords_str = implode("','", $keywords);

    // Récupérer les commentaires liés aux mots-clés
    $sql_comments = "
      SELECT comments.idc AS comment_id, users.username, users.field AS userField, comments.comment, comments.created_at,
             (SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comment_id = comments.idc AND comments_likes.type = 'like') AS likes,
             (SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comment_id = comments.idc AND comments_likes.type = 'dislike') AS dislikes
      FROM comments
      JOIN users ON comments.user_id = users.id
      JOIN comments_keywords ON comments.idc = comments_keywords.comment_id
      WHERE comments_keywords.keyword IN ('$keywords_str')
      GROUP BY comments.idc
      ORDER BY comments.created_at DESC
    ";

    $result_comments = $conn->query($sql_comments);

    if ($result_comments->num_rows > 0) {
      while ($row = $result_comments->fetch_assoc()) {
        $comments[] = $row;
      }
    }
  }

  // Si aucun commentaire trouvé par mots-clés, récupérer par catégorie
  if (empty($comments)) {
    $sql_comments = "
      SELECT comments.idc AS comment_id, comments.user_id, comments.comment, comments.created_at, users.username, users.field,
             (SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comment_id = comments.idc AND comments_likes.type = 'like') AS likes,
             (SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comment_id = comments.idc AND comments_likes.type = 'dislike') AS dislikes
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.category_id = $category_id
      ORDER BY comments.created_at DESC
    ";

    $result_comments = $conn->query($sql_comments);

    if ($result_comments->num_rows > 0) {
      while ($row = $result_comments->fetch_assoc()) {
        $comments[] = $row;
      }
    }
  }

  $final_result = ['detailed_comments' => $comments];
  echo json_encode($final_result);
} else {
  echo json_encode(['success' => false, 'message' => 'ID de catégorie invalide.']);
}

$conn->close();
?>
