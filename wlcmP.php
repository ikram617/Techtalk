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

    // Check if the username already exists
    $checkUsername = "SELECT username FROM users WHERE username = '$username'";
    $result = $conn->query($checkUsername);
    
    if ($result->num_rows > 0) {
        // Username already taken
        echo "<script>
                alert('Username already taken. Please choose another one.');
                window.location.href = '/sign-up.html'; // Replace with your sign-up page URL
              </script>";
    } else {
        // SQL query to insert user data into the database
        $sql = "INSERT INTO users (fullname, username, email, password, field) 
                VALUES ('$fullname', '$username', '$email', '$hashedPassword', '$field')";

        // Execute the query
        if ($conn->query($sql) === TRUE) {
            echo "<script>
                    document.getElementById('success-message').innerHTML = 'Inscription réussie !';
                    document.getElementById('success-message').style.display = 'block';
                    window.location.href = '/login.php'; // Replace with your success page URL
                  </script>";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
