var resultDropdown = $("#gameresult");

$(window).on("load", function() {
	results();

	$('#game').on("keyup input focus", function() {
		"use strict";
		results();
	});
});

function fetchData(id) {
	"use strict";
	$("#gameresult").css({"max-height" : "0", "overflow-y": "hidden", "padding": "0%"});

	if(req) {
		req.abort();
	}
	
	req = $.get("/sm807/coursework/includes/game_info.php", {search_id: id}).done(function(data) {
		data = JSON.parse(data);
		var titleEl = document.createElement("h2");
		titleEl.appendChild(document.createTextNode(data[1]));
		document.getElementById("gameinfo").appendChild(titleEl);

		var stockEl = document.createElement("h2");
		stockEl.appendChild(document.createTextNode("Stock: " + data[4]));
		document.getElementById("gameinfo").appendChild(stockEl);
	});
}

function results() {
	var inputVal = $('#game').val();
	$("#gameinfo").empty();
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
}
