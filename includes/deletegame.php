<?php
session_start();

require("dbconnect.php");

if(isset($_SESSION["username"]) && isset($_POST["id"])) {
	$request = htmlspecialchars($_POST["id"]);
	
	$stmt = $db->prepare("DELETE FROM games WHERE id = ?");
	$stmt->bind_param("i", $request);
	$stmt->execute();
}

$db->close();
?>