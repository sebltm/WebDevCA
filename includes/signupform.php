<?php
session_start();

require("dbconnect.php");

if(isset($_POST["username"]) && !isset($_POST["password"])) {
	$user = htmlspecialchars($_POST["username"]);
	
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
	$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
	
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
	
	$user = htmlspecialchars($_POST["username"]);
	$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
	
	$password = sha1(htmlspecialchars($_POST["password"]));
	$passCheck = sha1(htmlspecialchars($_POST["passwordCheck"]));
	
	if($password == $passCheck) {

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