<?php
	session_start();
?>

<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/management.css" type="text/css" rel="stylesheet">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script src="js/management.js"></script>
		<title>Game&amp;Co</title>
	</head>

	<body>

		<h1>Game&amp;Co Management Interface</h1>

		
		<?php 
		//Only display the management interface if the user is signed in, otherwise prompt the user to sign in using the sigin page
		if(isset($_SESSION["username"]) && !empty($_SESSION["username"])) { ?>
			<h2 id="logout">Welcome <?php echo $_SESSION["username"] ?> <a href="includes/logout.php">Logout</a></h2>
		
			<article id="pickgame">
				<input id="game" type="text" autocomplete="off" placeholder="Name of video game" size="22" />
				<div id="gameresult"></div>
				<button id="addgame" type="button"><a href="/sm807/coursework/addgame.php">Add a new game</a></button>
			</article>

			<section>

				<article id="gameinfo">
					<h2 id="title"></h2>
					<h3 id="stock"></h3>
					<h3 id="sold"></h3>
					<h3 id="publisher"></h3>
				</article>

				<article id="updatestock">
					<h2>Update the amount of items in stock:</h2>
					<input id="update" type="number" max="65534">
				</article>
				
				<article id="removegame">
					<form id="removeGameForm" action="/sm807/coursework/includes/deletegame.php">
						<input id="remove" type="submit" value="Delete.">
						<h2>This action is irreversible and immediate.</h2>
					</form>
				</article>
			</section>
		<?php } else { ?>
			<h2>Please <a href="index.php">sign-in</a></h2>
		<?php } ?>
	</body>
</html>
