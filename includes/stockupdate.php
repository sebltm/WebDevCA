<?php
session_start();

require_once("dbconnect.php");

if(isset($_POST['stock'])) {
	$stock = htmlspecialchars($_POST["stock"]);
	$stock = intval($stock); //Ensures any input will be an integer

	if(isset($_POST["name"]) && $stock>=0 && isset($_SESSION["username"])) {
		
		if($stock >= 65535) {
			die();
		}
		
		if($stmt = $db->prepare("UPDATE games SET stock= ? WHERE name= ?")) {
			$stmt->bind_param("is", $stock, $_POST["name"]);
			$stmt->execute();
			$stmt->close();
		}
	}
}

if(isset($_POST['sold'])) {
	$sold = htmlspecialchars($_POST["sold"]);
	$sold = intval($sold); //Ensures any input will be an integer

	if(isset($_POST["name"]) && $sold>=0 && isset($_SESSION["username"])) {
		
		if($stmt = $db->prepare("UPDATE games SET sold = ? WHERE name= ?")) {
			$stmt->bind_param("is", $sold, $_POST["name"]);
			$stmt->execute();
			$stmt->close();
		}
	}
}

$db->close();
?>