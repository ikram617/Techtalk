<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$fullname = isset($_SESSION['fullname']) ? $_SESSION['fullname'] : 'Guest';
$email = isset($_SESSION['email']) ? $_SESSION['email'] : 'Not provided';
$login_success = isset($_SESSION['login_success']) ? $_SESSION['login_success'] : '';
unset($_SESSION['login_success']); // Clear the message after displaying
?>
