<?php
// Database credentials
$host = 'localhost';  // Database host
$db = 'root';  // Your database name
$user = 'root';  // Your database username
$pass = '';  // Your database password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

