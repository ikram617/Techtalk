<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  echo "Vous devez être connecté pour ajouter des commentaires.";
  exit();
}

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "root";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST['comment'])) {
    $user_id = $_SESSION['user_id'];
    $comment = $conn->real_escape_string($_POST['comment']);

    $sql = "INSERT INTO comments (user_id, comment, created_at) VALUES ('$user_id', '$comment', NOW())";

    if ($conn->query($sql) === TRUE) {
      $comment_id = $conn->insert_id;
      // Analyser les mots-clés dans le commentaire
      $comment_words = explode(' ', $comment);
      foreach ($comment_words as $word) {
        // Vérifier si le mot existe dans la table keywords
        $sql_check_keyword = "SELECT keyword FROM keywords WHERE keyword = '$word'";
        $result_keyword = $conn->query($sql_check_keyword);
        if ($result_keyword->num_rows > 0) {
          while ($row = $result_keyword->fetch_assoc()) {
            // Ajouter l'entrée dans comments_keywords
            $sql_add_comment_keyword = "INSERT INTO comments_keywords (comment_id, keyword, created_at) VALUES ('$comment_id', '$word', NOW())";
            if ($conn->query($sql_add_comment_keyword) !== TRUE) {
              die("Failed to add comment keyword: " . $conn->error);
            }
          }
        }
      }
      echo "Comment added successfully";
    } else {
      echo "Error: " . $conn->error;
    }
  } else {
    echo "Le commentaire est vide.";
  }
}

$conn->close();
?>
