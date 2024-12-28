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

// Récupérer tous les commentaires existants
$sql_comments = "SELECT idc, comment FROM comments";
$result_comments = $conn->query($sql_comments);

if ($result_comments->num_rows > 0) {
  while ($comment_row = $result_comments->fetch_assoc()) {
    $comment_id = $comment_row['idc'];
    $comment_text = $comment_row['comment'];
    
    // Analyser les mots-clés dans le commentaire
    $comment_words = explode(' ', $comment_text);
    foreach ($comment_words as $word) {
      // Vérifier si le mot existe dans la table keywords
      $sql_check_keyword = "SELECT keyword FROM keywords WHERE keyword = '$word'";
      $result_keyword = $conn->query($sql_check_keyword);
      if ($result_keyword->num_rows > 0) {
        while ($keyword_row = $result_keyword->fetch_assoc()) {
          // Ajouter l'entrée dans comments_keywords
          $keyword = $keyword_row['keyword'];
          $sql_add_comment_keyword = "INSERT INTO comments_keywords (comment_id, keyword, created_at) VALUES ('$comment_id', '$keyword', NOW())";
          if ($conn->query($sql_add_comment_keyword) !== TRUE) {
            die("Failed to add comment keyword: " . $conn->error);
          }
        }
      }
    }
  }
  echo "Table comments_keywords remplie avec succès.";
} else {
  echo "Aucun commentaire trouvé.";
}

$conn->close();
?>
