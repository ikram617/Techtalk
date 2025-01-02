<?php
session_start();

$servername = "localhost";
$username = "root"; // Replace with your actual database username
$password = ""; // Replace with your actual database password
$dbname = "root"; // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => "Connection failed: " . $conn->connect_error]);
    exit();
}

$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null; // Assuming user ID is stored in session

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!$userId) {
        echo json_encode(['success' => false, 'message' => "User ID not found in session"]);
        exit();
    }

    if (isset($_GET['oldPassword']) && isset($_GET['newPassword'])) {
        $oldPassword = $_GET['oldPassword'];
        $newPassword = $_GET['newPassword'];

        // Log the received passwords for debugging
        echo json_encode(['success' => true, 'message' => "Received passwords", 'oldPassword' => $oldPassword, 'newPassword' => $newPassword]);

        // Check if old password is correct
        $sql = "SELECT password FROM users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Log the password fetched from the database for debugging
            echo json_encode(['success' => true, 'message' => "Password fetched from database", 'password_from_db' => $row['password']]);

            if (password_verify($oldPassword, $row['password'])) {
                // Log the verification success for debugging
                echo json_encode(['success' => true, 'message' => "Old password verified successfully"]);

                // Update with new hashed password
                $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                $updateSql = "UPDATE users SET password = ? WHERE id = ?";
                $updateStmt = $conn->prepare($updateSql);
                $updateStmt->bind_param("si", $hashedPassword, $userId);

                if ($updateStmt->execute()) {
                    echo json_encode(['success' => true, 'message' => "Password updated successfully"]);
                } else {
                    echo json_encode(['success' => false, 'message' => "Error updating password: " . $conn->error]);
                }
            } else {
                echo json_encode(['success' => false, 'message' => "Old password is incorrect"]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => "No user found with ID: " . $userId]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => "GET variables are not set", 'received_get_vars' => $_GET]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid request method", 'request_method' => $_SERVER['REQUEST_METHOD']]);
}

$conn->close();
?>
