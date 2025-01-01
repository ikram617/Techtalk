<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not authenticated']);
    exit;
}

$user_id = $_SESSION['user_id']; // Assurez-vous que l'utilisateur est connecté et que l'ID utilisateur est stocké en session

$host = 'localhost'; // Remplacez par vos informations de connexion à la base de données
$db = 'root';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}

$stmt = $pdo->prepare('SELECT username, field, email FROM users WHERE id = ?');
$stmt->execute([$user_id]);
$user_info = $stmt->fetch();

echo json_encode($user_info);
?>
