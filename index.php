<?php
	session_start();
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/index.css" type="text/css" rel="stylesheet">
        <!--[if IE]>
          <link rel="stylesheet" type="text/css" href="indexie.css" />
        <![endif]-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script src="/sm807/coursework/js/index.js"></script>
		<title>Game&amp;Co</title>
	</head>

	<body>

		<h1 role="">Game&amp;Co Management Log-In</h1>

		<form action="includes/login.php" id="signin" role="form" method="post">
			<input id="username" name="username" type="text" placeholder="Enter your email or your username">
			<input name="password" id="password" type="password" placeholder="Password">
			<div>
				<input id="submitbutton" type="submit" value="Login">
                <a id="signup" class="button" href="signup.php">Sign-up</a>
			</div>
			<h2 id="tryagain"></h2>
		</form>

		<?php 
		//Don't show the sign in form if there is a user signed-in, redirect to the management interface
		if(isset($_SESSION["username"]) && !empty($_SESSION["username"])) {
			?><script>window.location.assign("managementInterface.php");</script>
		<?php } ?>
	</body>
</html>
