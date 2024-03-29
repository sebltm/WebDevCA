<?php
	session_start();
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/signup.css" type="text/css" rel="stylesheet"></style>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script src="https://students.emps.ex.ac.uk/sm807/coursework/js/signup.js"></script>
		<title>Game&amp;Co</title>
	</head>

	<body>

		<h1 role="">Game&amp;Co Management Sign-Up</h1>

		<form action="https://students.emps.ex.ac.uk/sm807/coursework/signup.php" id="signupform" role="form" method="post">
			<input id="username" name="username" type="text" placeholder="Enter your username" required autocomplete="username">
			<input id="email" name="email" type="email" placeholder="Enter your email" required autocomplete="email">
			<input name="password" id="password" type="password" placeholder="Enter your password" required autocomplete="new-password">
			<input name="passwordcheck" id="passwordcheck" type="password" placeholder="Enter your password again" required autocomplete="new-password">
			<h2 id="tryagain"></h2>
			<input id="signup" value="Sign-up" type="submit">
		</form>

		<?php 
		//Don't show the sign in form if there is a user signed-in, redirect to the management interface
		if(isset($_SESSION["username"]) && !empty($_SESSION["username"])) {
			?><script>window.location.assign("https://students.emps.ex.ac.uk/sm807/coursework/managementInterface.php");</script>
		<?php } ?>
	</body>
</html>