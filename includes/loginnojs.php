<?php
session_start();

require_once("dbconnect.php");
require_once("password.php");

if(isset($_POST["username"]) && isset($_POST["password"])) {
	$user = $_POST["username"];
	$pass = sha1($_POST["password"]);
	
	$stmt = $db->prepare("SELECT username, password FROM users WHERE (username = ? OR email = ?) AND password = ?");
	
	$stmt->bind_param("sss", $user, $user, $pass);
	$stmt->bind_result($username, $password);
	$stmt->execute();

	if($stmt->fetch()) {
		if(password_verify($pass, $password)) {
			$_SESSION['username'] = $username;
        	header("Location: /sm807/coursework/managementInterface.php");
		}
	}
	
	else {
		echo 'false';
	}
	
	$stmt->close();
}

else {
	echo 'false';
}

$db->close();
?>