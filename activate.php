<?php
session_start();

require("dbconnect.php");

if(!isset($_SESSION["username"])) {
	$email = $_GET["email"];
	$token = $_GET["token"];
	
	$stmt = $db->prepare("SELECT token FROM users WHERE email = ?");
	$stmt->bind_param("s", $email);
	$stmt->bind_result($dbtoken);
	$stmt->execute();

	if($token == $dbtoken) {
		$stmt = $db->prepare("UPDATE users SET activate = 1 WHERE email = ?");
		$stmt->bind_param("s", $email);
		$stmt->execute();
		
		echo 'Account activated. Please click <a href="/sm807/coursework/index.php">here</a> to sign in.';
	}
	
	else {
		echo 'There was a problem in activating your account. Please try again or contact your administrator';
	}
}

else {
	header("/sm807/coursework/index.php");
}

?>