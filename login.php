<?php
session_start();
include('db.php');

header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result === FALSE) {
        $response['message'] = "There was an issue connecting to the database. Please try again later.";
    } else {
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['fullname'] = $user['fullname'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['email'] = $user['email'];
                $response['success'] = true;
                $response['message'] = "Login successful!";
            } else {
                $response['message'] = "The username or password you entered is incorrect. Please try again.";
            }
        } else {
            $response['message'] = "No account found with that username. Please try again.";
        }
    }
} else {
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);

$conn->close();
?>
