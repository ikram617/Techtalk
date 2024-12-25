<?php
// Récupérer les commentaires depuis la base de données
$servername = "localhost";
$username = "root"; // Remplace par ton nom d'utilisateur
$password = ""; // Remplace par ton mot de passe
$dbname = "root"; // Remplace par le nom de ta base de données

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT comment, created_at FROM comments ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Afficher chaque commentaire
    while($row = $result->fetch_assoc()) {
        echo "<div class='comment'>";
        echo "<p><strong>Utilisateur:</strong> " . $row['comment'] . "</p>";
        echo "<div class='reaction'>";
        echo "<button class='likeBtn'><i class='fa-solid fa-thumbs-up'></i></button>";
        echo "<button class='dislikeBtn'><i class='fa-solid fa-thumbs-down'></i></button>";
        echo "</div>";
        echo "</div>";
    }
} else {
    echo "Aucun commentaire.";
}

$conn->close();
?>
