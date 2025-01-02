<!DOCTYPE html>
<html>
<head>
   <link href="userP.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <title>Your profile</title>
    <meta charset="UTF-8">
</head>
<body>
    <?php
    session_start();

    $servername = "localhost";
    $username = "root"; // Replace with your actual database username
    $password = ""; // Replace with your actual database password
    $dbname = "root"; // Replace with your actual database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null; // Assuming user ID is stored in session

    $response = null;
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!$userId) {
            $response = ['success' => false, 'message' => "User ID not found in session"];
        } elseif (isset($_POST['oldPassword']) && isset($_POST['newPassword'])) {
            $oldPassword = $_POST['oldPassword'];
            $newPassword = $_POST['newPassword'];

            // Check if old password is correct
            $sql = "SELECT password FROM users WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();

                if (password_verify($oldPassword, $row['password'])) {
                    // Update with new hashed password
                    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                    $updateSql = "UPDATE users SET password = ? WHERE id = ?";
                    $updateStmt = $conn->prepare($updateSql);
                    $updateStmt->bind_param("si", $hashedPassword, $userId);

                    if ($updateStmt->execute()) {
                        $response = ['success' => true, 'message' => "Password updated successfully"];
                    } else {
                        $response = ['success' => false, 'message' => "Error updating password: " . $conn->error];
                    }
                } else {
                    $response = ['success' => false, 'message' => "Old password is incorrect"];
                }
            } else {
                $response = ['success' => false, 'message' => "No user found with ID: " . $userId];
            }
        } else {
            $response = ['success' => false, 'message' => "POST variables are not set"];
        }
        echo '<script>alert("' . $response['message'] . '");</script>';
    }

    $conn->close();
    ?>

    <div class="menu"> 
        <i class="fa-solid fa-arrow-left"></i>
        <nav>
            <span>TechTalk</span>
        </nav>
    </div>
    <div class="page">
        <div class="infoProfile">
            <div class="info">
                <div class="username">
                    <p>Username : <span id="username">Loading...</span></p>
                </div>
                <div class="field">
                    <p>Professional field : <span id="field">Loading...</span></p>
                </div>
                <div class="email">
                    <p>Email : <span id="email">Loading...</span></p>
                </div>
            </div>
            <i class="fa-solid fa-circle-user"></i>
        </div>
        <div class="options">
            <div class="reset">
                <span>Reset password</span>
                <i class="fa-solid fa-key"></i>
            </div>
            <div class="archive">
                <span>Archive</span>
                <i class="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div class="addaccount">
                <span>Add account</span>
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="logout">
                <span>Log out</span>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
        </div>
        <div class="resetBlock innactive">
            <form id="resetForm" method="POST" action="">
                <div class="current">
                    <span>Current password :</span>
                    <input type="password" id="oldPassword" name="oldPassword" required>
                </div>
                <div class="new">
                    <span>New password :</span>
                    <input type="password" id="newPassword" name="newPassword" required>
                </div>
                <div class="buttons">
                    <button type="button" class="backpsw">Back</button>
                    <button type="submit" class="validate">Validate</button>
                </div>
            </form>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            fetch('get_user_info.php')
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error('Error:', data.error);
                        document.getElementById('username').textContent = 'Error';
                        document.getElementById('field').textContent = 'Error';
                        document.getElementById('email').textContent = 'Error';
                    } else {
                        document.getElementById('username').textContent = data.username;
                        document.getElementById('field').textContent = data.field;
                        document.getElementById('email').textContent = data.email;
                    }
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                    document.getElementById('username').textContent = 'Error';
                    document.getElementById('field').textContent = 'Error';
                    document.getElementById('email').textContent = 'Error';
                });
        });
    </script>
    <script src="userP.js"></script>
</body>
</html>
