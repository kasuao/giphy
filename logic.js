// alert("you are connected!");
$(document).ready(function(){
	//initial gif buttons
	var topics = ["Pittsburgh Steelers", "Golden+State Warriors", "LA Dodgers"]
	//=======================================================================
	//function for redering the gif
	function renderButtons(){
		//removes gifs before adding new ones to avoid duplicates
		$("#buttons-views").empty();
		//loops through topics array
		for (var i = 0; i < topics.length; i++) {
			//dynamically create buttons
			var button = $("<buttons>");
			//add data-name attribute
			button.attr("data-name", topics[i]);
			//add bootstrap button class
			button.attr("class", "btn btn-danger gif");
			//add space between buttons
			button.attr("style", "margin-left: 20px;")
			//add text to the buttons
			button.text(topics[i]);
			//add buttons to the buttons-view div
			$("#buttons-views").append(button);
		}
	}
	//=======================================================================
		//Way for user to add buttons
		$("#add-gifs").on("click", function(event){
			event.preventDefault();
			console.log("button is workings");
			//grabs added gifs from text field
			var gif = $("topic-input").val();
			console.log(gif);//well that was undefined
			//pushes added gifs to the topics array
			topics.push(gif);
			// console.log(topics);//this shows my new button is undefined
			$("#topic-input").val("");
			// console.log(topics);//still undefined
			//calls the renderButtons function
			renderButtons();
		});

	//=======================================================================
	//display gif function renders buttons to display appropriate buttons and gifs
	//from giphy.com
	function displayGifInfo() {
		var gif = $(this).attr("data-name");
		var apiKey = "dc6zaTOxFJmzC";
		//NEEDS TO BE COMPLETED
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey ;
		//AJAX call for gif button being clicked
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {
			// console.log(this.url);
			// console.log(response);

			var dataArray = response.data;

			$("#gif-views").empty();
			for (var i = 0; i < dataArray.length; i++) {
				//add a new div in 'gif-views' for gif from giphy to reside 
				var newDiv = $("<div>");
				//add a class to the new div created above
				newDiv.addClass("newGif");
				//show and format rating
				var rating = $("<em>").html("Rating: " + dataArray[i].rating);
				console.log(rating);
				//add rating into newDiv
				newDiv.append(rating);
				//add image tags in 'gif-views'
				var newImg = $("<img>");
				//adding attributes to the image tags that will be dynamically created
				newImg.attr("src", dataArray[i].images.fixed_height_still.url);//paused state
				newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);//create data-still attribute in image tag
				newImg.attr("data-animate", dataArray[i].images.fixed_height.url);//animated state
				newImg.attr("data-state", "still");
				newImg.attr("style", "float: left;")
				newDiv.append(newImg);
			}
		});
	}
	//======================================================================================
	//function to play still gifs
});





