<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  echo "Vous devez être connecté pour voir les commentaires.";
  exit();
}

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "root;

$conn = new mysqli($servername, $username, $password, $dbname);


if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $user_id = $_SESSION['user_id'];

  $sql = "SELECT comment FROM comments WHERE user_id = '$user_id'";
  $result = $conn->query($sql);

  $comments = [];
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $comments[] = $row;
    }
  }

  echo json_encode($comments);
}

$conn->close();
?>
