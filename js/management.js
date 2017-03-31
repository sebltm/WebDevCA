var currentGame = {
	id: undefined,
	sold: undefined,
	title: undefined,
	stock: undefined,
	publisher: undefined
};

var req, sales, results, fetchData, emptyInfo, timepersale, amountpersale, propsensityToSellLow, propsensityToSellHigh, timepersale, amountpersale, gameid, windowWidth;

$(window).on("load", function () {
	"use strict";
	
	windowWidth = (typeof window.outerWidth !== 'undefined')?Math.max(window.outerWidth, $(window).width()):$(window).width();
	
	console.log(windowWidth);
    
    results(); //Fetch the games
    
	$('#game').on("click keydown keyup", function () {
        //Couldn't use on change, input or focus because IE was making a fuss
        
		clearTimeout(sales); //Stop the sales simulator
        
		showSearch(); //Display the results
		
		results(); //Fetch the new results
	});
	
	$("#update").on("focus", function () {
        if(sales) {
		  clearTimeout(sales); //Stop the sales simulator while the user is has focus on the stock update
        }
	});
    
    $("#update").on("blur", function () {
        salesSimulator(); //Restart the sales simulator when the user is done inputing
	});
    
    $("#update").on("input change", function () { //Update the stock based on what the user has entered
        if ($("#update").val() >= 0) {
			var stockupdate = $.post("https://students.emps.ex.ac.uk/sm807/coursework/includes/stockupdate.php", {stock: $("#update").val(), name: currentGame.title});
			
			stockupdate.done(function () {
				fetchData(currentGame.id); //Fetch the new information
			});
		}
    });
	
	$("#removeGameForm").submit(function (e) { //Remove a game from the database
		e.preventDefault(); //Do not submit the form
		
		$.post("https://students.emps.ex.ac.uk/sm807/coursework/includes/deletegame.php", {id: currentGame.id}).done(function () {
			
            showSearch(); //Show the results window
            
			results(); //Fetch results
			
		});
		
		return false;
	});
	
});


function showSearch() {
	"use strict";
	
    setTimeout(function () {
        $("#gameinfo").hide();
        $("#removegame").hide();
        $("#updatestock").hide();
	}, 500); //Hide the game info with time for transitions
    
    $("section").css({
		"margin": "0",
		"max-height": "0",
		"min-height": "0"
	}); //Hide the section of game info, removes the useless scrollbar
    
	if(windowWidth > 1020) {
        $("#game").css({
			"width": "60vw",
			"border": "none",
			"font-size": "1.8em",
			"border-radius": "0px",
			"border-bottom": "2px solid rgba(0, 128, 0, 1)",
			"box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
		}); //Show the game search bar 
    } //For desktops, only allow the lower half of the screen
    
    else {
        $("#game").css({
			"width": "90vw",
			"border": "none",
			"font-size": "1.8em",
			"border-radius": "0px",
			"border-bottom": "2px solid rgba(0, 128, 0, 1)",
			"box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
		}); //Show the game search bar
    }

	$("#game").hover(function () {
        this.style.borderBottom = "2px solid rgba(0, 128, 0, 1)";
		this.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
	});
	
	if(windowWidth > 1020) {
        $("#gameresult").css({
			"margin": "auto",
			"height": "45vh",
			"overflow-y": "scroll",
			"border-bottom": "1px solid rgba(0, 0, 0, 1)"
		});
    } //For desktops, only allow the lower half of the screen
    
    else {
        $("#gameresult").css({
			"margin": "auto",
			"height": "55vh",
			"overflow-y": "scroll",
			"border-bottom": "1px solid rgba(0, 0, 0, 1)"
		});
    }
	
	$("#game").attr("placeholder", "Name of video game"); //Reset the placeholder
}


function fetchAndFormat(id) {
	"use strict";
	
    fetchData(id); //Fetch and display the data of the game
    
    if(windowWidth > 1020) {
        $("section").css({
			"margin": "2% 0 0",
    		"min-height": "40vh",
			"max-height": "40vh"
		});  
    } //For desktops, only allow the lower half of the screen
    
    else {
        $("section").css({
			"margin": "2% 0 0",
    		"min-height": "40vh",
        	"max-height": "500vh"
		});
    } //On mobiles, allow for more space
    
    /*Display all info sections with flexbox*/
	$("#gameinfo").css({ "display": "flex" }); 

	$("#removegame").css({ "display": "flex" });
	
	$("#updatestock").css({ "display": "flex" });

	$("#game").val(""); //Empty the search bar of previous searches
	
	$("#gameresult").css({
		"margin": "0",
		"height": "0",
		"padding": "0%",
		"overflow-y": "hidden",
		"border-bottom": "1px solid rgba(0, 0, 0, 0)"
	}); //Hide the result box
	
	$("#game").attr("placeholder", "Search"); //Put a smaller placeholder
	
	$("#game").css({
		"width": "10vw",
		"border": "1px solid black",
		"box-shadow": "0 0px 0px 0 rgba(0, 0, 0, 0.0)"
	}); //Take emphasis away from search bar to give more space to important information
    
    $("#game").hover(
		function () {
			this.style.borderBottom = "2px solid rgb(0, 128, 0)";
			this.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
		},
		
		function () {
			this.style.borderBottom = "1px solid black";
			this.style.boxShadow = "0 0px 0px 0 rgba(0, 0, 0, 0.0)";
	});
}


function fetchData(id) {
	"use strict";
		
	if (sales) {
		clearTimeout(sales); //Clear the sales simulator
	}
	
	if (req) {
		req.abort(); //Abort any previous game info ajax request
	}
	
	req = $.post("https://students.emps.ex.ac.uk/sm807/coursework/includes/game_info.php", {search_id: id}); //Load the game's info
	
	req.done(function (data) { //Display the game info and start the sales simulator
        data = JSON.parse(data);
		
		currentGame.id = data.id;
		currentGame.image = data.url;
		currentGame.sold = data.sold;
		currentGame.title = data.name;
		currentGame.stock = data.stock;
        currentGame.price = data.price;
		currentGame.publisher = data.publisher;
		
		
		$("#update").val(data.stock);
		$("#title").html(data.name);
		$("#sold").html("Sold: " + data.sold);
		$("#gameimage").attr("src", data.url);
		$("#stock").html("Stock: " + data.stock);
        $("#cost").html("Price : £" + data.price);
		$("#publisher").html("Publisher: " + data.publisher);
		
		document.getElementById("gameimage").onload = function() {
			$("#gameimage").show();
			$("#bounceimage").hide();
		};

        salesSimulator();
	});
}

function salesSimulator() {
	"use strict";
	
    /*Sales simulator*/
    propsensityToSellLow = 23*currentGame.price; //Cheap games are getting bought at a faster
    propsensityToSellHigh = 55*currentGame.price;
    
    amountpersale = Math.floor((Math.random() * 10) + 1);
    timepersale = Math.floor((Math.random() * propsensityToSellHigh) + propsensityToSellLow);

    sales = setTimeout(function () {
        if (currentGame.stock > 0) {
            currentGame.sold += amountpersale; //Update the game's new amount sold
            currentGame.stock -= amountpersale; //Update the game's new amout in stock

            var stockupdate = $.post("https://students.emps.ex.ac.uk/sm807/coursework/includes/stockupdate.php", {
				stock: currentGame.stock,
				sold: currentGame.sold,
				name: currentGame.title
			}); //Update the database

            stockupdate.done(function () {
                fetchData(currentGame.id); //Fetch the latest information from the database
            });
        }
			
    }, timepersale);
}


function results() {
	"use strict";
    
	var inputVal = $('#game').val(); //Get what the user has typed

	if(windowWidth > 1020) {
        $("#gameresult").css({
			"margin": "auto",
			"height": "45vh",
			"overflow-y": "scroll",
			"border-bottom": "1px solid rgba(0, 0, 0, 1)"
		});
    } //For desktops, only allow the lower half of the screen
    
    else {
        $("#gameresult").css({
			"margin": "auto",
			"height": "55vh",
			"border-bottom": "1px solid rgba(0, 0, 0, 1)"
		});
    }

	if (inputVal.length) { //If the user has typed something, get results similar to the input
		$.get("https://students.emps.ex.ac.uk/sm807/coursework/includes/game_search.php", {term: inputVal}).done(function (data) {
			$("#gameresult").empty();
			if(data !== "<h2>No results</h2>") {
				
				data = JSON.parse(data);
				
				for(var i = 0; i<data.length; i++) {
					$("#gameresult").append('<div gameid="'+data[i].id+'" class="gameresult"><h2>'+data[i].name+'</h2><img src="'+data[i].url+'"/></div>');
				}
				
				$(".gameresult").on("click", function () {
					gameid = parseInt(this.getAttribute("gameid"));
					fetchAndFormat(gameid);
				});
				
			} else { $("#gameresult").html(data); }
            
		});
		
	} else if (inputVal.length === 0) { //If the field is empty, show all games available
		$.get("https://students.emps.ex.ac.uk/sm807/coursework/includes/game_search.php", {all: 1}).done(function (data) {
			
			$("#gameresult").empty();
			
			if(data !== "<h2>No results</h2>") {
				
				data = JSON.parse(data);
				
				for(var i = 0; i<data.length; i++) {
					$("#gameresult").append('<div gameid="'+data[i].id+'" class="gameresult"><h2>'+data[i].name+'</h2><img src="'+data[i].url+'"/></div>');
				}
				
				loadSale();
				
				$(".gameresult").on("click", function () {
					gameid = parseInt(this.getAttribute("gameid"));
					fetchAndFormat(gameid);
				});
				
				
			} else { $("#gameresult").html(data); }
		});
		
	} else { $("#gameresult").html(""); } //Otherwise the window should be empty
	
	setTimeout(function () {
		emptyInfo(); //Clear the game info results should there be any
	}, 500);
}

function loadSale() {
	
	var array = [];
	var labels = [];

	$("#sales").empty();
	$.get("https://students.emps.ex.ac.uk/sm807/coursework/includes/load_stock.php", {}).done(function(data) {
		
		data = JSON.parse(data);
		
		for(var i = 0; i<6; i++) {
			array.push(parseInt(data[i].stock));
			labels.push(data[i].name);
			console.log(data[i].name);
		}
		
		var w = $("#gameresult").width();
		var h = $("#gameresult").height();
		var max = d3.max(array);
		var margin = w*0.1;

		var sales = d3.select("#stock")
			.append("svg")
			.attr("width", w)
			.attr("height", h);
		
		var yScale = d3.scale.linear()
			.domain([0, d3.max(array)])
			.range([h, 0]);
		
		var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left");
		
		sales.selectAll("rect")
			.data(array)
			.enter()
			.append("rect")
			.attr("x", function(d, i) {
				return (i*(w/array.length));
			})
			.attr("y", function(d) {
				return h - (d * h / max);
			})
			.attr("width", (w/array.length)*0.95)
			.attr("height", function(d) {
				return yScale(0)-yScale(d);
			})
			.attr("fill", function(d) {
				return "rgb("+Math.floor(255-(d*255/max))+ ", "+Math.floor(d*255/max)+" , 0)";
			});
		
		sales.selectAll("text")
			.data(labels)
			.enter()
			.append("text")
			.text(function(d) {
				return d;
			})
			.attr("x", function(d, i) {
				return (i * (w / array.length))*1.05;
			})
			.attr("y", function(d, i) {
				return h - 15*(i+1);
			});
		
		sales.append("g")
			.attr("class", "axis")
			.call(yAxis);
		
		var formatAsPercentage = d3.format(".1%");
		yAxis.tickFormat(50);
		
	});
}

function emptyInfo() { //Empty the different game info fields
	"use strict";
	
	$("#cost").html("");
	$("#sold").html("");
	$("#title").html("");
	$("#stock").html("");
	$("#publisher").html("");
	$("#gameimage").attr("src", "");
	
	currentGame.id = null; //Empty the current game object
	currentGame.sold = null;
	currentGame.title = null;
	currentGame.stock = null;
	currentGame.publisher = null;
	
	$("#updatestock").hide();
}
