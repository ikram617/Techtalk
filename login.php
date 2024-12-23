<?php
// Start the session
session_start();

// Include the database connection file
include('db.php');

// Check if the form is submitted
if (isset($_POST['login'])) {
    // Get the form input and sanitize
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // SQL query to fetch user data based on email
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    // Check if the user exists
    if ($result->num_rows > 0) {
        // Fetch the user data
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Password is correct, start a session and redirect
            $_SESSION['user_id'] = $user['id'];  // Store user ID in session
            $_SESSION['fullname'] = $user['fullname']; // Store fullname in session
            $_SESSION['email'] = $user['email']; // Store email in session

            // Redirect to dashboard or main page
            header("Location: dashboard.php");
            exit();
        } else {
            // Incorrect password
            echo "Incorrect password.";
        }
    } else {
        // No user found with that email
        echo "No user found with that email.";
    }
}

$conn->close();
?>
