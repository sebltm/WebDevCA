<?php
require_once("dbconnect.php");

if(isset($_REQUEST['search_id'])) {
	if($stmt = $db->prepare("SELECT * FROM games WHERE id= ?")) {
		$request = $_REQUEST['search_id'];
		$stmt->bind_param("i", $request);
		$stmt->bind_result($id, $name, $publisher, $releasedate, $stock, $sold);
		$stmt->execute();
		if($stmt->fetch()) {
			$result_array = array();
			array_push($result_array, $id, $name, $publisher, $releasedate, $stock, $sold);
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
