var resultDropdown = $("#gameresult");

var currentMovie = {
	id: undefined,
	title: undefined,
	stock: undefined,
	sold: undefined,
	publisher: undefined
};

$(window).on("load", function() {
	results();

	$('#game').on("keyup input focus", function() {
		$("#gameinfo").hide();
		$("#updatestock").hide();
		$("#removegame").hide();
		
		results();
		
		$("#game").css({
			"width": "60vw",
			"font-size": "1.8em",
			"border-bottom": "2px solid rgba(0, 128, 0, 1)",
			"border-radius": "0px",
			"box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
		});
		
		$("#game").hover(
		function() {
			this.style.borderBottom = "2px solid rgba(0, 128, 0, 1)";
			this.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
		});
		
		document.getElementById("game").setAttribute("placeholder", "Name of video game");
	});
	
	$("#update").on("keyup input change", function() {
		if(document.getElementById("update").value >= 0) {
			var stockupdate = $.post("/sm807/coursework/includes/stockupdate.php", {stock: document.getElementById("update").value, name: currentMovie.title});
			
			stockupdate.done(function() {
				fetchData(currentMovie.id);
			});
		}
	});
	
	$("#removeGameForm").submit(function(e) {
		e.preventDefault();
		
		$.post("/sm807/coursework/includes/deletegame.php", {id: currentMovie.id}).done(function() {
			$("#gameinfo").hide();
			$("#updatestock").hide();
			$("#removegame").hide();

			results();

			$("#game").css({
				"width": "60vw",
				"font-size": "1.8em",
				"border-bottom": "2px solid rgba(0, 128, 0, 1)",
				"border-radius": "0px",
				"box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
			});

			$("#game").hover(
			function() {
				this.style.borderBottom = "2px solid rgba(0, 128, 0, 1)";
				this.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
			});

			document.getElementById("game").setAttribute("placeholder", "Name of video game");
		});
		
		return false;
	});
	
});

function fetchAndFormat(id) {
	$("#gameinfo").css({
		"display": "flex"
	});
	
	$("#updatestock").css({
		"display": "flex"
	});

	$("#removegame").css({
		"display": "flex"
	});

	document.getElementById("game").value = "";
	
	$("#gameresult").css({
			"max-height" : "0",
			"overflow-y": "hidden", 
			"padding": "0%"
	});
	
	document.getElementById("game").setAttribute("placeholder", "Search");
	
	$("#game").css({
		"width": "10vw",
		"border": "1px solid black",
		"box-shadow": "0 0px 0px 0 rgba(0, 0, 0, 0.0)"
	});
	
	$("#game").hover(
		function() {
			this.style.borderBottom = "2px solid rgb(0, 128, 0)";
			this.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
		},
		
		function() {
			this.style.borderBottom = "1px solid black";
			this.style.boxShadow = "0 0px 0px 0 rgba(0, 0, 0, 0.0)";
	});

	fetchData(id);
}

function fetchData(id) {
	if(req) {
		req.abort();
	}
	
	var req = $.post("/sm807/coursework/includes/game_info.php", {search_id: id}).done(function(data) {
		data = JSON.parse(data);
		
		currentMovie.id = data.id;
		currentMovie.title = data.name;
		currentMovie.stock = data.stock;
		currentMovie.sold = data.sold;
		currentMovie.publisher = data.publisher;
		
		document.getElementById("title").innerHTML = data.name;
		document.getElementById("stock").innerHTML = "Stock: "+data.stock;
		document.getElementById("sold").innerHTML = "Sold: "+data.sold;
		document.getElementById("publisher").innerHTML = "Publisher: "+data.publisher;
		
		document.getElementById("update").value = data.stock;
	});
}

function results() {
	"use strict";
	var inputVal = $('#game').val();
	$("#gameresult").css({"max-height" : "50vh", "overflow-y": "scroll", "padding": "1%"});

	if(inputVal.length){
		$.get("/sm807/coursework/includes/game_search.php", {term: inputVal}).done(function(data) {
			document.getElementById("gameresult").innerHTML = data;
		});
	}

	else if(inputVal.length === 0) {
		$.get("/sm807/coursework/includes/game_search.php", {all: 1}).done(function(data) {
			document.getElementById("gameresult").innerHTML = data;
		});
	}

	else {
		resultDropdown.empty();
	}
	
	
	emptyInfo();
}

function emptyInfo() {
	document.getElementById("title").innerHTML = "";
	document.getElementById("stock").innerHTML = "";
	document.getElementById("sold").innerHTML = "";
	document.getElementById("publisher").innerHTML = "";
	
	currentMovie.id = null;
	currentMovie.title = null;
	currentMovie.stock = null;
	currentMovie.sold = null;
	currentMovie.publisher = null;
	
	$("#updatestock").hide();
}
