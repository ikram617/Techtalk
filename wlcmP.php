<?php
include('db.php'); // Include the database connection

// Check if the form is submitted
if (isset($_POST['signup'])) {
    // Get form data
    $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $field = mysqli_real_escape_string($conn, $_POST['field']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    
    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // SQL query to insert user data into the database
    $sql = "INSERT INTO users (fullname, username, email, password, field) 
            VALUES ('$fullname', '$username', '$email', '$hashedPassword', '$field')";

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        echo "Sign-up successful!";
        // Optionally redirect to login page
        header("Location: login.php");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
