<?php
	session_start();
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/index.css" type="text/css" rel="stylesheet"></style>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<title>Game&amp;Co</title>
	</head>

	<body>

		<h1 role="">Game&amp;Co Management Log-In</h1>

		<form action="includes/login.php" method="post" role="form">
			<input type="text" placeholder="Enter your email or your username">
			<input type="password" placeholder="Password">
			<input id="submitbutton" type="submit">
		</form>

	</body>
</html>
