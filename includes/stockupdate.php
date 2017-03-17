<?php
require_once("dbconnect.php");

if(isset($_POST['stock']) && isset($_POST["name"]) && $_POST['stock']>=0) {
	
	if($stmt = $db->prepare("UPDATE games SET stock= ? WHERE name= ?")) {
		$stmt->bind_param("is", (int) $_POST['stock'], $_POST["name"]);
		$stmt->execute();
	}
}
?>