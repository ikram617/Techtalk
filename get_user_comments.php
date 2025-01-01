<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "root";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT users.username, users.field, comments.content, comments.likes FROM comments JOIN users ON comments.user_id = users.id WHERE user_id = '$user_id'";
$result = $conn->query($sql);

$comments = [];

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $comments[] = $row;
  }
} else {
  // Debugging statement to see if no comments were found
  echo "No comments found for user_id: $user_id";
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($comments);
?>
