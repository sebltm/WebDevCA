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
		}
	}
}

$db->close();
?>