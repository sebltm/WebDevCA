<?php
session_start();

require("dbconnect.php");

if(isset($_POST["username"]) && isset($_POST["password"])) {
	$user = htmlspecialchars($_POST["username"]);
	$pass = htmlspecialchars($_POST["password"]);
	
	$stmt = $db->prepare("SELECT username, password FROM users WHERE (username = ? OR email = ?)");
	
	$stmt->bind_param("ss", $user, $user);
	$stmt->bind_result($username, $password);
	$stmt->execute();

	if($stmt->fetch()) {
		if(password_verify($pass, $password)) {
			$_SESSION['username'] = $username;
			echo 'true';
		}
		
		else {
			echo 'false';
		}
	}
	
	else {
		echo 'false';
	}
}

else {
	echo 'false';
}
?>