// JavaScript Document

$(window).on("load", function() {
	"use strict";
	
	//When the user submits the form
	$("#signin").submit(function(event) {
		//Catch the submit action
		event.preventDefault();
        
        $("#submitbutton").hide();
		$("#bounce").css({"display": "flex"});
        
		//Catch all the fields in the form
		var postData = {};
		var inputs = this.getElementsByTagName("input");
		for(var i = 0; i<inputs.length-1; i++) {
			postData[inputs[i].getAttribute("name")] = inputs[i].value;
		}
		
		//Submit an AJAX request. If the text in the answer is "true", the user will be signed in and redirected. Otherwise, the user will be prompted to try again
		$.ajax({
            type: "post",
            url: "includes/login.php",
            data: postData,
            success: function(response) {
                if(response === 'true') {
                    window.location.assign("https://students.emps.ex.ac.uk/sm807/coursework/managementInterface.php");
				}
				
				else {
					$("#tryagain").show();
                    $("#submitbutton").show();
		            $("#bounce").hide();
					document.getElementById("tryagain").innerHTML = "Please try again";
				}
            },
			
			//If there is an error, display the error in the console
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
		
	});
	
});