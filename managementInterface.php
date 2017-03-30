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
		<script src="https://students.emps.ex.ac.uk/sm807/coursework/js/management.js"></script>
		<script src="https://d3js.org/d3.v3.min.js"></script>
		<title>Game&amp;Co</title>
	</head>

	<body>

		<h1>Game&amp;Co Management Interface</h1>

		
		<?php 
		//Only display the management interface if the user is signed in, otherwise prompt the user to sign in using the sigin page
		if(isset($_SESSION["username"]) && !empty($_SESSION["username"])) { 
			if($_SESSION["active"] == 1) { ?>
				<h2 id="logout">Welcome <?php echo $_SESSION["username"] ?> <a href="https://students.emps.ex.ac.uk/sm807/coursework/includes/logout.php">Logout</a></h2>

				<article id="pickgame">
					<input id="game" type="text" autocomplete="off" placeholder="Name of video game" size="22" />
					<div id="gameresult">
						<h2 id="nojava">Please enable JavaScript, I need it to work...</h2>
						<div id="bounce" class="bouncing">
							<svg height="70px" width="100%">
								<circle class="bouncy1" cx="25%" cy="60%" r="6%" stroke="black" stroke-width="1" fill="black" />
								<circle class="bouncy2" cx="50%" cy="60%" r="6%" stroke="black" stroke-width="1" fill="black" />
								<circle class="bouncy3" cx="75%" cy="60%" r="6%" stroke="black" stroke-width="1" fill="black" />
							</svg>
						</div>
					</div>
					<a class="button" id="addgame" href="https://students.emps.ex.ac.uk/sm807/coursework/addgame.php">Add a new game</a>
					
					<div id="sales"></div>
				</article>

				<section>

					<article id="gameinfo">
						<div id="image">
							<div id="bounceimage" class="bouncing">
								<svg height="70px" width="100%">
									<circle class="bouncy1" cx="25%" cy="60%" r="6%" stroke="black" stroke-width="1" fill="black" />
									<circle class="bouncy2" cx="50%" cy="60%" r="6%" stroke="black" stroke-width="1" fill="black" />
									<circle class="bouncy3" cx="75%" cy="60%" r="6%" stroke="black" stroke-width="1" fill="black" />
								</svg>
							</div>
							<img id="gameimage" src="" />
						</div>
						<div id="info">
							<h2 id="title"></h2>
							<h3 id="stock"></h3>
							<h3 id="sold"></h3>
							<h3 id="publisher"></h3>
							<h3 id="cost"></h3>
						</div>
					</article>

					<article id="updatestock">
						<h2>Update the amount of items in stock:</h2>
						<input id="update" type="number" max="65534">
					</article>

					<article id="removegame">
						<form id="removeGameForm" action="https://students.emps.ex.ac.uk/sm807/coursework/includes/deletegame.php">
							<input id="remove" type="submit" value="Delete.">
							<h2>This action is irreversible and immediate.</h2>
						</form>
					</article>

				</section>
		<?php } else { ?>
				<h2>Please check your email to activate your account. You will need to <a href="https://students.emps.ex.ac.uk/sm807/coursework/includes/logout.php">logout</a> and sign back in.</h2>
		<?php   }
			} else { ?>
			<h2>Please <a href="index.php">sign-in</a> or check your email to activate your account.</h2>
		<?php } ?>
	</body>
    
    <script>
		
		var array = [1, 2, 3, 4, 5, 6];
		
		var x=d3.scale.linear()
			.domain([0, d3.max(data)])
			.range([0, 420]);
		
		d3.select("#sales")
			.selectAll("div")
				.data(data)
			.enter().append("div")
				.style("width", function(d), {return x(d)+"px";})
				.text(function(d) {return d; });
		
        document.getElementById("nojava").style.display = "none";
    </script>
</html>
