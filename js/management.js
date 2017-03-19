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
		
		results();
		
		$("#game").css({
			"width": "60vw",
			"font-size": "1.8em"
		});
	});
	
	$("#update").on("keyup input change", function() {
		if(document.getElementById("update").value >= 0) {
			var stockupdate = $.post("includes/stockupdate", {stock: document.getElementById("update").value, name: currentMovie.title});
			
			stockupdate.done(function() {
				fetchData(currentMovie.id);
			});
		}
	});
	
});

function fetchData(id) {
	$("#gameinfo").show();
	$("#updatestock").show();
	
	$("#gameresult").css({
			"max-height" : "0",
			"overflow-y": "hidden", 
			"padding": "0%"
	});
	
	$("#game").css({
		"width": "20vw",
		"font-size": "1em"
	});

	if(req) {
		req.abort();
	}
	
	var req = $.get("/sm807/coursework/includes/game_info.php", {search_id: id}).done(function(data) {
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
