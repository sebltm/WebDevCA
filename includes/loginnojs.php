<?php
session_start();

require("dbconnect.php");

if(isset($_POST["username"]) && isset($_POST["password"])) {
	$user = $_POST["username"];
	$pass = sha1($_POST["password"]);
	
	$stmt = $db->prepare("SELECT username FROM users WHERE (username = ? OR email = ?) AND password = ?");
	
	$stmt->bind_param("sss", $user, $user, $pass);
	$stmt->bind_result($username);
	$stmt->execute();

	if($stmt->fetch()) {
		$_SESSION['username'] = $username;
        header("Location: /sm807/coursework/managementInterface.php");
	}
	
	else {
		echo 'false';
	}
}

else {
	echo 'false';
}
?>