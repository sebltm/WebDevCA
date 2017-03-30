<?php
session_start();

include("dbconnect.php");

if(!isset($_SESSION["username"])) {
	$email = htmlspecialchars($_GET["email"]);
	$token = $_GET["token"];
	
	$stmt = $db->prepare("SELECT token, active FROM users WHERE email = ?");
	$stmt->bind_param("s", $email);
	$stmt->bind_result($dbtoken, $active);
	$stmt->execute();
	
	$stmt->fetch();
	
	$stmt->close();
	
	if($token == $dbtoken && $active == 0) {
		$update = $db->prepare("UPDATE users SET active = 1 WHERE email = ?");
		$update->bind_param("s", $email);
		$update->execute();
		
		echo 'Account activated. Please click <a href="/sm807/coursework/index.php">here</a> to sign in.';
		
		$update->close();
		
		$update = $db->prepare("UPDATE users SET token = '' WHERE email = ?");
		$update->bind_param("s",  $email);
		$update->execute();
		
		$update->close();
	}
	
	else {
		echo 'There was a problem in activating your account. Please try again or contact your administrator';
	}
}

else {
	header("/sm807/coursework/index.php");
}

$db->close();

?>