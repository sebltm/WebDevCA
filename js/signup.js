// JavaScript Document

$(window).on('load', function() {
	
	document.getElementById("password").addEventListener("input", function() {
		checkPasswords();
	});
	
	document.getElementById("passwordcheck").addEventListener("input", function() {
		checkPasswords();
	});
	
	document.getElementById("username").addEventListener("input", function(e) {
		var username = document.getElementById("username").value;
		
		$.post("https://students.emps.ex.ac.uk/sm807/coursework/includes/signupform.php", {username: username}).done(function(data) {
			if(data === "true") {
				document.getElementById("username").style.borderBottom = "2px solid red";
			}
			
			else {
				document.getElementById("username").style.borderBottom = "2px solid green";
			}
		});

	});
	
	document.getElementById("email").addEventListener("input", function(e) {
		var email = document.getElementById("email").value;
		
		$.post("https://students.emps.ex.ac.uk/sm807/coursework/includes/signupform.php", {email: email}).done(function(data) {
			if(data === "true") {
				document.getElementById("email").style.borderBottom = "2px solid red";
			}
			
			else {
				document.getElementById("email").style.borderBottom = "2px solid green";
			}
		});
	});
	
	
	$("#signupform").submit(function(e) {
		e.preventDefault();
		
		var username = document.getElementById("username").value;
		var email = document.getElementById("email").value;
		var pass = document.getElementById("password").value;
		var passCheck = document.getElementById("passwordcheck").value;
		
		$.post("https://students.emps.ex.ac.uk/sm807/coursework/includes/signupform.php", {username: username, email: email, password: pass, passwordCheck: passCheck}).done(function(data) {
			if(data === "true") {
				window.location.assign("https://students.emps.ex.ac.uk/sm807/coursework/managementInterface.php");
			}
			
			else {
				document.getElementById("tryagain").innerHTML = data;
			}
		});
		
		return false;
	});
});

function checkPasswords() {
	if(document.getElementById("password").value == document.getElementById("passwordcheck").value) {
		document.getElementById("password").style.borderBottom = "2px solid green";
		document.getElementById("passwordcheck").style.borderBottom = "2px solid green";
	}

	else {
		document.getElementById("password").style.borderBottom = "2px solid red";
		document.getElementById("passwordcheck").style.borderBottom = "2px solid red";
	}
}