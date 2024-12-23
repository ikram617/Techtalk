<?php
session_start();
include('db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result === FALSE) {
        echo "Error in SQL query: " . $conn->error;
    } else {
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['fullname'] = $user['fullname'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['login_success'] = "Good login";

                header("Location: dashboard.php");
                exit();
            } else {
                echo "Incorrect username or password.";
            }
        } else {
            echo "No user found with that username.";
        }
    }
} else {
    echo "Invalid request method.";
}

$conn->close();
?>
