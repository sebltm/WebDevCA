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
        if (document.getElementById("update").value >= 0) {
			var stockupdate = $.post("/sm807/coursework/includes/stockupdate.php", {stock: document.getElementById("update").value, name: currentGame.title});
			
			stockupdate.done(function () {
				fetchData(currentGame.id); //Fetch the new information
			});
		}
    });
	
	$("#removeGameForm").submit(function (e) { //Remove a game from the database
		e.preventDefault(); //Do not submit the form
		
		$.post("/sm807/coursework/includes/deletegame.php", {id: currentGame.id}).done(function () {
			
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
    
    $("#game").css({
		"width": "60vw",
        "border": "none",
		"font-size": "1.8em",
		"border-radius": "0px",
		"border-bottom": "2px solid rgba(0, 128, 0, 1)",
		"box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
	}); //Show the game search bar

	$("#game").hover(function () {
        this.style.borderBottom = "2px solid rgba(0, 128, 0, 1)";
		this.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
	});
    
    $("#gameresult").css({
		"margin": "auto",
		"height": "45vh",
		"border-bottom": "1px solid rgba(0, 0, 0, 1)"
	});
	
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
		"padding": "0%",
		"max-height" : "0vh",
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
	
	req = $.post("/sm807/coursework/includes/game_info.php", {search_id: id}); //Load the game's info
	
	req.done(function (data) { //Display the game info and start the sales simulator
        data = JSON.parse(data);
		
		currentGame.id = data.id;
		currentGame.image = data.url;
		currentGame.sold = data.sold;
		currentGame.title = data.name;
		currentGame.stock = data.stock;
        currentGame.price = data.price;
		currentGame.publisher = data.publisher;
		
		
		document.getElementById("update").value = data.stock;
		document.getElementById("title").innerHTML = data.name;
		document.getElementById("sold").innerHTML = "Sold: " + data.sold;
		document.getElementById("gameimage").setAttribute("src", data.url);
		document.getElementById("stock").innerHTML = "Stock: " + data.stock;
        document.getElementById("cost").innerHTML = "Price : £" + data.price;
		document.getElementById("publisher").innerHTML = "Publisher: " + data.publisher;
		
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

            var stockupdate = $.post("/sm807/coursework/includes/stockupdate.php", {
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
	$("#gameresult").css({
		"padding": "1%",
		"max-height" : "45vh",
		"overflow-y": "scroll"
	}); //Update the size of the result window

	if (inputVal.length) { //If the user has typed something, get results similar to the input
		$.get("/sm807/coursework/includes/game_search.php", {term: inputVal}).done(function (data) {
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
		$.get("/sm807/coursework/includes/game_search.php", {all: 1}).done(function (data) {
			
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
		
	} else { $("#gameresult").html(""); } //Otherwise the window should be empty
	
	setTimeout(function () {
		emptyInfo(); //Clear the game info results should there be any
	}, 500);
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
