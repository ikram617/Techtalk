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

$sql = "SELECT comments.comment, users.username FROM comments JOIN users ON comments.user_id = users.id";
$result = $conn->query($sql);

$comments = [];
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
  }
}

echo json_encode($comments);

$conn->close();
?>
