<?php
session_start();

require("dbconnect.php");

if(isset($_SESSION["username"]) && isset($_POST["id"])) {
	$stmt = $db->prepare("DELETE FROM games WHERE id = ?");
	$request = $_POST["id"];
	$stmt->bind_param("i", $request);
	$stmt->execute();
}

$db->close();
?>