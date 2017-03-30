<?php
session_start();

require_once("dbconnect.php");
require_once("password.php")

if(isset($_POST["username"]) && isset($_POST["password"])) {
	$user = htmlspecialchars($_POST["username"]);
	$pass = htmlspecialchars($_POST["password"]);
	
	$stmt = $db->prepare("SELECT username, password, active FROM users WHERE (username = ? OR email = ?)");
	
	$stmt->bind_param("ss", $user, $user);
	$stmt->bind_result($username, $password, $active);
	$stmt->execute();

	if($stmt->fetch()) {
		if(password_verify($pass, $password)) {
			$_SESSION['username'] = $username;
			$_SESSION["active"] = (int) $active;
			echo 'true';
		}
		
		else {
			echo 'false';
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