<?php

session_start();

require_once("dbconnect.php");

if(isset($_SESSION["username"]) && isset($_POST["name"]) && isset($_POST["publisher"]) && isset($_POST["date"]) && isset($_POST["url"]) && isset($_POST["price"])) {
    
	$name = htmlspecialchars($_POST["name"]);
	$publisher = htmlspecialchars($_POST["publisher"]);
	$date = strtotime($_POST["date"]);
	$url = filter_input(INPUT_POST, "url", FILTER_VALIDATE_URL);
    $price = floatval($_POST["price"]);
    
	$stock = 0;
	$sold = 0;
	
	$year = date("y", $date);
	$month = date("m", $date);
	$day = date("d", $date);
	
	if(!checkdate($month, $day, $year)) {
		echo "The date is not formatted properly";
	}
	
	elseif($url == false) {
		echo "The URL is incorrect";
	}
	
	else {
		$date = $year."-".$month."-".$day;
		$stmt = $db->prepare("INSERT INTO games (name, publisher, url, releasedate, stock, sold, price) VALUES(?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("ssssiid", $name, $publisher, $url, $date, $stock, $sold, $price);
		$stmt->execute();
		$stmt->close();
	}
}

$db->close();
?>