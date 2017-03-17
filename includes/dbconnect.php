<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$db = new mysqli("localhost", "sm807", "Makline2","sm807");

if($db->connect_error) {
  die("Connecion aborted: ".$db->connect_error);
}
?>
