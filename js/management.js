var resultDropdown = $("#gameresult");

$(window).on("load", function() {
	"use strict";
	results();

	$('#game').on("keyup input focus", function() {
		results();
	});
	
	document.getElementById("update").addEventListener("change", function() {
		if(document.getElementById("update").value >= 0) {
			$.post("includes/stockupdate", {stock: document.getElementById("update").value, name: title});
		}
	});
});

function fetchData(id) {
	"use strict";
	$("#gameresult").css({"max-height" : "0", "overflow-y": "hidden", "padding": "0%"});

	if(req) {
		req.abort();
	}
	
	var req = $.get("/sm807/coursework/includes/game_info.php", {search_id: id}).done(function(data) {
		data = JSON.parse(data);
		title = data.name;
		document.getElementById("title").innerHTML = title;
		document.getElementById("stock").innerHTML = "Stock: "+data.stock;
		document.getElementById("sold").innerHTML = "Sold: "+data.sold;
		document.getElementById("publisher").innerHTML = "Publisher: "+data.publisher;
	});
}

function emptyInfo() {
	"use strict";
	document.getElementById("title").innerHTML = "";
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
