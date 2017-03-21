<?php
require_once("dbconnect.php");

if(isset($_POST['stock']) && isset($_POST["name"]) && $_POST['stock']>=0 && isset($_SESSION["username"])) {
	
	if($stmt = $db->prepare("UPDATE games SET stock= ? WHERE name= ?")) {
		$stock = (int) $_POST['stock'];
		$stmt->bind_param("is", $stock, $_POST["name"]);
		$stmt->execute();
	}
}

$db->close();
?>