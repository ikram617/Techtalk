<?php
// Start the session
session_start();

// Check if the user is logged in, if not redirect to login page
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");  // Redirect to login page if not logged in
    exit();
}

// Fetch the user's information from the session
$fullname = $_SESSION['fullname'];
$email = $_SESSION['email'];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <h1>Welcome, <?php echo $fullname; ?>!</h1>
    <p>Your email: <?php echo $email; ?></p>

    <a href="logout.php">Logout</a>
</body>
</html>
