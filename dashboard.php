<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$fullname = $_SESSION['fullname'];
$email = $_SESSION['email'];
$login_success = isset($_SESSION['login_success']) ? $_SESSION['login_success'] : '';
unset($_SESSION['login_success']); // Clear the message after displaying
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <style>
        .success-message {
            background-color: #dff0d8;
            color: #3c763d;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <?php if ($login_success): ?>
    <div class="success-message">
        <p><?php echo $login_success; ?></p>
    </div>
    <?php endif; ?>

    <h1>Welcome, <?php echo $fullname; ?>!</h1>
    <p>Your email: <?php echo $email; ?></p>

    <a href="logout.php">Logout</a>
</body>
</html>
