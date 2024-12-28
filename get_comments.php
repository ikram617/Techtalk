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

// Récupérer les commentaires
$sql = "SELECT users.username, users.field, comments.comment FROM comments JOIN users ON comments.user_id = users.id ORDER BY comments.created_at DESC";
$result = $conn->query($sql);

$comments = [];
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
  }
}

$conn->close();
echo json_encode($comments);
?>
