<?php
session_start();

require_once("dbconnect.php");

if(isset($_SESSION["username"])) {
	$stmt = $db->prepare("SELECT name, stock FROM games ORDER BY stock ASC");
	$stmt->bind_result($name, $stock);
	$stmt->execute();

	$result_array = array();
	$temp_array = array();

	if($stmt->fetch()) {

		$temp_array = array(
			"name" => $name,
			"stock" => $stock
		);

		array_push($result_array, $temp_array);

		while($stmt->fetch()) {
			$temp_array = array(
			"name" => $name,
			"stock" => $stock
			);

			array_push($result_array, $temp_array);
		}

		echo json_encode($result_array);
	}
}

$db->close();
?>