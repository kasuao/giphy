// alert("you are connected!");
$(document).ready(function(){
	console.log("page is ready!");
	//initial gif buttons
	var topics = ["Pittsburgh Steelers", "Golden+State Warriors", "LA Dodgers"]
	console.log("here is your current array: " + topics);
	//=======================================================================
	//function for redering the buttons
	function renderButtons(){
		//removes gifs before adding new ones to avoid duplicates
		$("#buttons-views").empty();
		//loops through topics array
		for (var i = 0; i < topics.length; i++) {
			//dynamically create buttons
			var button = $("<buttons>");
			//add class for these buttons for css manipulation
			button.attr("data-name", topics[i]);
			//add bootstrap button class
			button.attr("class", "btn btn-success dynamicBtn");
			//add text to the buttons
			button.text(topics[i]);
			//add buttons to the buttons-view div
			$("#buttons-views").append(button);
			// console.log(button);
		}
	}
	//=======================================================================
		//This code dictates what happens when the add-gifs button is clicked
		$("#add-gifs").on("click", function(event){
			// event.preventDefault();
			console.log("button is workings");
			//grabs added gifs from text field
			var sportTeam = $("added-input").val();
			console.log(sportTeam);//well that was undefined
			//pushes added gifs to the topics array
			topics.push(sportTeam);
			// console.log(topics);//this shows my new button is undefined
			$("#topic-input").val("");
			// console.log(topics);//still undefined
			//calls the renderButtons function
			renderButtons();
		});

	//=======================================================================
	//display gifs
	//from giphy.com
	function displayGifInfo() {
		console.log("displayGifInfo is working.");//checking if this function is running
		var teamName = $(this).attr("data-name");
		// data-name 
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + teamName + "&rating=G&limit=10&api_key=17fc47eaba4b409690e2b088080bb877";
		console.log(queryURL);
		//AJAX call for gif button being clicked
		$.ajax({
			method: "GET",
			url: queryURL,
			
		})
		.done(function(response) {

			var dataArray = response.data;

			$("#gif-views").empty();
			for (var i = 0; i < dataArray.length; i++) {
				//add a new div in 'gif-views' for gif from giphy to reside 
				var newDiv = $("<div>");
				newDiv.attr("class", "newGif");
				//show and format rating
				var rating = $("<em>").html("Rating: " + dataArray[i].rating);
				console.log(rating);
				//add image tags in 'gif-views'
				var newImg = $("<img>");
				//adding attributes to the image tags that will be dynamically created
				newImg.attr("src", dataArray[i].images.fixed_height_still.url);//paused state
				newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);//create data-still attribute in image tag
				newImg.attr("data-animate", dataArray[i].images.fixed_height.url);//animated state
				newImg.attr("data-state", "still");
				//add rating into newDiv
				newDiv.append(rating);
				newDiv.append("<br>");
				//add gif to page
				newDiv.append(newImg);
				$("#gif-views").prepend(newDiv);
			}
		});
		//This section is not working for whatever reason. If you look at the console it shows a bunch of
		//<em> tags which I'm guessing is coming from the "var ratings" line....
	}
	//======================================================================================
	//function to play still gifs
	function animateGifs(){
		var state = $(this).find("img").attr("data-state");
		if (state === "still") {
			//find the source with the animate state
			$(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
			//change the img data-state to animate
			$(this).find("img").attr("data-state", "animate");
		}else {
			//I THINK this is simply saying to keep the data-state as still. Not totally sure just 
			//followed the previous exercises for pausing gifs.
			$(this).find("img").attr("src", $(this).find("img").attr("data-still"));
			$(this).find("img").attr("data-state", "still");
		}
	}

	//=========================================================================
	//Call functions
	renderButtons();

	$(document).on("click", displayGifInfo);

	$(document).on("click", animateGifs);
});





