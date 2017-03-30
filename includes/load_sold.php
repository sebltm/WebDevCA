<?php
session_start();

require_once("dbconnect.php");

if(isset($_SESSION["username"])) {
	$stmt = $db->prepare("SELECT name, sold FROM games ORDER BY sold ASC");
	$stmt->bind_result($name, $sold);
	$stmt->execute();

	$result_array = array();
	$temp_array = array();

	if($stmt->fetch()) {

		$temp_array = array(
			"name" => $name,
			"sold" => $sold
		);

		array_push($result_array, $temp_array);

		while($stmt->fetch()) {
			echo $sold
			
			$temp_array = array(
			"name" => $name,
			"sold" => $sold
			);

			array_push($result_array, $temp_array);
		}

		echo json_encode($result_array);
	}
}

$db->close();
?>