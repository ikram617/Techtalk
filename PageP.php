<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "root"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT username, field FROM users WHERE id = '$user_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $username = $row['username'];
  $field = $row['field'];
} else {
  $username = "Guest";
  $field = "Unknown";
}

$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
<link href="PageP.css?v=1.1" rel="stylesheet">

  <title>TechTalk</title>
  <meta charset="UTF-8">
  <!-- <link href="./PageP.css" rel="stylesheet"> -->
  <link href="https://fonts.googleapis.com/css2?family=Orbit&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <script>
    const username = "<?php echo $username; ?>";
    const userField = "<?php echo $field; ?>";
  </script>
</head>
<body>
  <div class="menu">
    <nav>
      <span>TechTalk</span>
      <div class="buttons">
        <div class="cercle">
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="logout">
          <button>Log out</button>
        </div>
      </div>
    </nav>
  </div>

  <div class="page">
    <div class="searchDiv">
      <div class="searchBar">
        <input type="text" placeholder="Search for a topic">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>

    <div class="categories">
      <div class="CategoriesTitle">
        <span>Categories</span>
      </div>
      <div class="CategoriesNames">
      <div class="CategoriesNames">
  <ul>
    <li data-category-id="1">
      <img class="AiPhoto" src="./resource/Aitheone.png" alt="">
      <div class="Titres innactive">
        <p>Artificial Intelligence</p>
      </div>
    </li>
    <li data-category-id="2">
      <img class="dataSPhoto" src="./resource/datasc.png" alt="">
      <div class="Titres innactive">
        <p>Data Science</p>
      </div>
    </li>
    <li data-category-id="3">
      <img class="CyberPhoto" src="./resource/cybersecurity.webp" alt="">
      <div class="Titres innactive">
        <p>Cyber Security</p>
      </div>
    </li>
    <li data-category-id="4">
      <img class="FullSPhoto" src="./resource/fullStack.webp" alt="">
      <div class="Titres innactive">
        <p>Full Stack</p>
      </div>
    </li>
    <li data-category-id="5">
      <img class="CloudPhoto" src="./resource/cloud.webp" alt="">
      <div class="Titres innactive">
        <p>Cloud Computing</p>
      </div>
    </li>
  </ul>
</div>

      </div>
      <div class="help">
        <button>Help</button>
      </div>
    </div>

    <div class="posts">
    <div class="postLike">
    </div>
    </div>

    <div class="addPost">
      <i class="fa-regular fa-comment-dots"></i>
    </div>
    <div class="newPost innactive">
      <span>What would you like to share with us today <?php echo $username; ?> ?</span>
      <textarea name="" id=""></textarea>
      <div class="buttonsPost">
        <button class="BackButton">Back</button>
        <button class="AddButton">Add</button>
      </div>
    </div>
  </div>
<script src="PageP.js?v=1.1"></script>
</body>
</html>
