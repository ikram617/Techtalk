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

    $sql = "INSERT INTO comments (user_id, comment) VALUES ('$user_id', '$comment')";

    if ($conn->query($sql) === TRUE) {
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
