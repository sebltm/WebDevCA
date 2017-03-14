<?php
require_once("dbconnect.php");

if(isset($_REQUEST['search_id'])) {
	if($stmt = $db->prepare("SELECT * FROM games WHERE id= ?")) {
		$request = $_REQUEST['search_id'];
		$stmt->bind_param("i", $request);
		$stmt->execute();
		$result_array = $stmt->get_result();
		if(!empty($result_array)) {
			$array = array();
			$temp_array = array();
			foreach($result_array as $row) {
				$temp_array = $row;
				array_push($array, $temp_array);
			}
			echo json_encode($array);
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
