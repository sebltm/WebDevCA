// JavaScript Document
$(window).on("load", function() {
	"use strict";
	$("#signin").submit(function(event) {
		event.preventDefault();
		
		var postData = {};
		var inputs = this.getElementsByTagName("input");
		for(var i = 0; i<inputs.length-1; i++) {
			postData[inputs[i].getAttribute("name")] = inputs[i].value;
		}
		
		$.ajax({
            type: "post",
            url: "includes/login.php",
            data: postData,
            success: function(response) {
				console.log(response);
                if(response === "true") {
					window.location.assign("managementInterface.php");
				}
				
				else {
					$("#tryagain").show();
					document.getElementById("tryagain").innerHTML = "Please try again";
				}
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
		
		return false;
	});
});