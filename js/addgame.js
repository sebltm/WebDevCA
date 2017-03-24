// JavaScript Document

$(window).on("load", function() {
	$("#addgame").submit(function(e) {
		e.preventDefault();

		var name = document.getElementById("name").value;
		var publisher = document.getElementById("publisher").value;
		var date = document.getElementById("date").value;
		var url = document.getElementById("url").value;
        var price = document.getElementById("price").value;

		$.post("/sm807/coursework/includes/insertgame.php", {name: name, publisher: publisher, date: date, url: url, price: price}).done(function(data) {
			if(data === "") {
				window.location.assign("/sm807/coursework/managementInterface.php");
			}
			
			else {
				document.getElementById("invalid").innerHTML = data;
			}
		});

		return false;
	});
});