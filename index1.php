<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

// Connexion à la base de données
$servername = "root";
$username = "root";
$password = "";
$dbname = "root";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT username FROM users WHERE id = '$user_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $username = $row['username'];
} else {
  $username = "Guest";
}

$conn->close();

echo json_encode(['username' => $username]);
?>
