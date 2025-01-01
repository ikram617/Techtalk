<?php
session_start();

// For debugging purposes, assign a user_id if not set
if (!isset($_SESSION['user_id'])) {
    $_SESSION['user_id'] = 1; // Dummy user ID for testing
}

$servername = "localhost";
$username = "root"; // Replace with your actual database username
$password = ""; // Replace with your actual database password
$dbname = "root"; // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userId = $_SESSION['user_id']; // Assuming user ID is stored in session

echo "Request Method: " . $_SERVER['REQUEST_METHOD'] . "<br>"; // Debugging statement

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['oldPassword']) && isset($_POST['newPassword'])) {
        $oldPassword = $_POST['oldPassword'];
        $newPassword = $_POST['newPassword'];

        echo "Old Password: " . $oldPassword . "<br>"; // Debugging statement
        echo "New Password: " . $newPassword . "<br>"; // Debugging statement

        // Check if old password is correct
        $sql = "SELECT password FROM users WHERE id = $userId";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo "Password from DB: " . $row['password'] . "<br>"; // Debugging statement

            if (password_verify($oldPassword, $row['password'])) {
                // Update with new password
                $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                $sql = "UPDATE users SET password = '$hashedPassword' WHERE id = $userId";

                if ($conn->query($sql) === TRUE) {
                    echo "Password updated successfully";
                } else {
                    echo "Error updating password: " . $conn->error;
                }
            } else {
                echo "Old password is incorrect";
            }
        } else {
            echo "No user found with ID: " . $userId . "<br>"; // Debugging statement
        }
    } else {
        echo "POST variables are not set";
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>
