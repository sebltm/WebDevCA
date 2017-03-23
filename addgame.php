<?php
	session_start();
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/addgame.css" type="text/css" rel="stylesheet"></style>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script src="/sm807/coursework/js/addgame.js"></script>
		<title>Game&amp;Co</title>
	</head>

	<body>

		<h1>Add a new game</h1>

		<?php 
		//Only display the management interface if the user is signed in, otherwise prompt the user to sign in using the sigin page
		if(isset($_SESSION["username"]) && !empty($_SESSION["username"])) { ?>
		<form action="/sm807/coursework/includes/insertgame.php" id="addgame" role="form" method="post">
			<input id="name" name="name" type="text" placeholder="Name of the game" required>
			<input id="publisher" name="publisher" type="text" placeholder="Game publisher" required>
			<label id="datelabel" for="date">Date published: </label><input id="date" name="date" type="date" value="<?php echo date("Y-m-d") ?>" required>
			<input id="url" name="url" type="url" placeholder="URL of cover image" required>
			<h2 id="invalid"></h2>
			<input id="submit" value="Submit" type="submit">
		</form>

		<?php } else { ?>
			<h2>Please <a href="index.php">sign-in</a></h2>
		<?php } ?>
	</body>
</html>