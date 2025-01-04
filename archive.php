<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
$sql = "SELECT users.username, users.field, comments.comment, comments.created_at, 
       -- SUM(CASE WHEN comments_likes.type = 'like' THEN 1 ELSE 0 END) AS like_count,
       -- SUM(CASE WHEN comments_likes.type = 'dislike' THEN 1 ELSE 0 END) AS dislike_count
        comments.like_count,
        comments.dislike_count
        FROM comments
        JOIN users ON comments.user_id = users.id
        LEFT JOIN comments_likes ON comments.idc = comments_likes.comment_id
        WHERE comments.user_id = '$user_id'
        GROUP BY comments.idc";
$result = $conn->query($sql);

if (!$result) {
  die("Query failed: " . $conn->error);
}

$comments = [];

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $comments[] = $row;
  }
} else {
  echo json_encode(["error" => "No comments found for user_id: $user_id"]);
  exit();
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($comments);
?>
