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

$keyword = isset($_GET['keyword']) ? $conn->real_escape_string($_GET['keyword']) : '';

$sql = "
  SELECT comments.idc AS comment_id, users.username, users.field AS userField, comments.comment, comments.created_at,
         (SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comment_id = comments.idc AND comments_likes.type = 'like') AS likes,
         (SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comment_id = comments.idc AND comments_likes.type = 'dislike') AS dislikes
  FROM comments
  JOIN users ON comments.user_id = users.id
  WHERE comments.comment LIKE '%$keyword%'
  ORDER BY comments.created_at DESC
";

$result = $conn->query($sql);
$comments = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
  }
}

echo json_encode(['detailed_comments' => $comments]);

$conn->close();
?>
