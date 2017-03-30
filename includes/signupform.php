<?php
session_start();

require("dbconnect.php");
require("password.php");

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
	
	$password = htmlspecialchars($_POST["password"]);
	$passCheck = htmlspecialchars($_POST["passwordCheck"]);
	
	if($password == $passCheck) {
		$password = password_hash($password, PASSWORD_DEFAULT);
		
		$stmt = $db->prepare("INSERT INTO users (username, email, password) VALUES(?, ?, ?)");

		$stmt->bind_param("sss", $user, $email, $password);
		$stmt->execute();
		
		$_SESSION["username"] = $user;
		$hash = md5(rand(0,1000));
		
		$message = "Please activate your account at the following url:\n<a> href='students.emps.ex.ac.uk/sm807/coursework/activate.php?email=".$email."token=".$hash."</a>";
		$message = wordwrap($message, 70, "\r\n");

		// Send
		mail($email, 'Please activate your account', $message);
		
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