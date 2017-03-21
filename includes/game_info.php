<?php
session_start();

require_once("dbconnect.php");

if(isset($_POST['search_id']) && isset($_SESSION['username'])) {
	if($stmt = $db->prepare("SELECT * FROM games WHERE id= ?")) {
		$request = $_POST['search_id'];
		$stmt->bind_param("i", $request);
		$stmt->bind_result($id, $name, $publisher, $releasedate, $stock, $sold);
		$stmt->execute();
		if($stmt->fetch()) {
			$result_array = array(
				"id" => $id,
				"name" => $name,
				"publisher" => $publisher,
				"releasedate" => $releasedate,
				"stock" => $stock,
				"sold" => $sold
			);
			$json = json_encode($result_array);
			echo $json;
		}

		else {
			echo "<h1>No matches found</h1>";
		}
	}

	else {
		var_dump($db);
		echo "Error while trying to connect to MySQL database: " . $db->connect_error;
	}
}

$db->close();
?>