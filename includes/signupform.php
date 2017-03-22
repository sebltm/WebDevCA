<?php
session_start();

require("dbconnect.php");

if(isset($_POST["username"]) && !isset($_POST["password"])) {
	$user = $_POST["username"];
	
	$stmt = $db->prepare("SELECT username FROM users WHERE username = ?");
	$stmt->bind_param("s", $user);
	$stmt->bind_result($username);
	$stmt->execute();
	$stmt->fetch();
	
	if(!empty($username)) {
		echo "true";
	}
}

else if(isset($_POST["email"]) && !isset($_POST["password"])) {
	$email = $_POST["email"];
	
	$stmt = $db->prepare("SELECT email FROM users WHERE email = ?");
	$stmt->bind_param("s", $email);
	$stmt->bind_result($emailreq);
	$stmt->execute();
	$stmt->fetch();
	
	if(!empty($emailreq)) {
		echo "true";
	}
}

else if(isset($_POST["username"]) && isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["passwordCheck"]) && !(empty($_POST["username"]) && empty($_POST["email"]) && empty($_POST["password"]) && empty($_POST["passwordCheck"]))) {
	//SANITIZE ALL INPUTS HERE
	
	$password = sha1($_POST["password"]);
	$passCheck = sha1($_POST["passwordCheck"]);
	
	if($password == $passCheck) {
		$user = $_POST["username"];
		$email = $_POST["email"];

		$stmt = $db->prepare("INSERT INTO users (username, email, password) VALUES(?, ?, ?)");

		$stmt->bind_param("sss", $user, $email, $password);
		$stmt->execute();
		
		$_SESSION["username"] = $user;
		
		echo "true";
	}
	
	else {
		echo "Password and check don't mach";
	}
}

else {
	echo 'Please fill in all fields';
}
?>