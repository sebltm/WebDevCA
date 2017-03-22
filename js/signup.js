// JavaScript Document

$(window).on('load', function() {
	
	document.getElementById("password").addEventListener("input", function() {
		checkPasswords();
	});
	
	document.getElementById("passwordcheck").addEventListener("input", function() {
		checkPasswords();
	});
	
	
	$("#signupform").submit(function(e) {
		e.preventDefault();
		var username = document.getElementById("username").value;
		var email = document.getElementById("email").value;
		var pass = document.getElementById("password").value;
		var passCheck = document.getElementById("passwordcheck").value;
		
		$.post("/sm807/coursework/includes/signupform.php", {username: username, email: email, password: pass, passwordCheck: passCheck}).done(function() {
			
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