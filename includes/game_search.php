<?php
session_start();

require("dbconnect.php");

if(isset($_SESSION["username"])) {
	if(isset($_GET['term'])) {
		$request = htmlspecialchars($_GET["term"]);
		
		$stmt = $db->prepare("SELECT id, name FROM games WHERE name LIKE ? ORDER BY name ASC");
		$request = $request."%";
		$stmt->bind_param("s", $request);
		$stmt->bind_result($id, $name);
		$stmt->execute();

		if($stmt->fetch()) {
			?><a href="#" onClick="fetchAndFormat(<?php echo $id ?>)"><h2><?php echo $name?></h2></a><?php
			while($stmt->fetch()) {
				?><a href="#" onClick="fetchAndFormat(<?php echo $id ?>)"><h2><?php echo $name?></h2></a><?php
			}
		}

		else {
			?><h2>No results</h2><?php
		}
	}

	else if(isset($_REQUEST["all"]) && $_REQUEST["all"] == 1) {
    $result_array = $db->query("SELECT id, name FROM games");
    if($result_array) {
      while($row = $result_array->fetch_row()) {
        ?><a href="#" onClick="fetchAndFormat(<?php echo $row[0] ?>)"><h2><?php echo $row[1]?></h2></a><?php
      }
    }

    else {
      ?><h2>No results</h2><?php
    }
  }
}

else {
	echo '<h2>Please <a href="index.php">sign-in</a></h2>';
}

$db->close();
?>
