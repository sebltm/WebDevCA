<?php
session_start();

require_once("dbconnect.php");

if(isset($_SESSION["username"])) {
    
    if(isset($_GET['term'])) {
		$request = htmlspecialchars($_GET["term"]);
		
		$stmt = $db->prepare("SELECT id, name, url FROM games WHERE name LIKE ? ORDER BY CASE WHEN name = ? THEN 1 WHEN name LIKE ? THEN 2 WHEN name LIKE ? THEN 3 ELSE 4 END");
		$request_top = $request."%";
		$request_mid = "%".$request;
		$request_all = "%".$request."%";
		$stmt->bind_param("ssss", $request_all, $request, $request_top, $request_mid);
		$stmt->bind_result($id, $name, $url);
		$stmt->execute();
        
        $result_array = array();
        $temp_array = array();
        
		if($stmt->fetch()) {
            
            $temp_array = array(
                "id" => $id,
                "name" => $name,
                "url" => $url
            );
            
            array_push($result_array, $temp_array);
            
			while($stmt->fetch()) {
				$temp_array = array(
                "id" => $id,
                "name" => $name,
                "url" => $url
                );
                
                array_push($result_array, $temp_array);
			}
            
            echo json_encode($result_array);
		}

		else {
			?><h2>No results</h2><?php
		}
		
		$stmt->close();
	}

	else if(isset($_REQUEST["all"]) && $_REQUEST["all"] == 1) {
		$stmt = $db->prepare("SELECT id, name, url FROM games ORDER BY name ASC");
		$stmt->bind_result($id, $name, $url);
		$stmt->execute();

		$result_array = array();
		$temp_array = array();
		
		if($stmt->fetch()) {

			$temp_array = array(
				"id" => $id,
				"name" => $name,
				"url" => $url
			);

			array_push($result_array, $temp_array);

			while($stmt->fetch()) {
				$temp_array = array(
				"id" => $id,
				"name" => $name,
				"url" => $url
				);

				array_push($result_array, $temp_array);
			}

			echo json_encode($result_array);
		}

		else {
			?><h2>No results</h2><?php
		
		}
		
		$stmt->close();
  	}
}

else {
	echo '<h2>Please <a href="index.php">sign-in</a></h2>';
}

$db->close();
?>
