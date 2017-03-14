<?php
	session_start();
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/management.css" type="text/css" rel="stylesheet"></style>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script src="js/management.js"></script>
		<title>Game&amp;Co</title>
	</head>

	<body>

		<h1>Game&amp;Co Management Interface</h1>

		<?php if(isset($_SESSION["username"]) && !empty($_SESSION["username"])) { ?>
			<article id="pickgame">
				<input id="game" type="text" autocomplete="off" placeholder="Name of video game" size="22" />
				<div id="gameresult"></div>
			</article>

			<section>

				<article id="gameinfo">

				</article>

				<article id="removegame">

				</article>

				<article id="updatestock">

				</article>
			</section>
		<?php } else { ?>
			<h2>Please <a href="index.php">sign-in</a></h2>

		<?php } ?>
	</body>
</html>
