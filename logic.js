alert("you are connected!");
//initial gif buttons
var topics = ["Pittsburgh Steelers", "Golden State Warriors", "LA Dodgers"]

//display gif function renders buttons to display appropriate buttons and gifs
function displayGifInfo() {
	var gif = $(this).attr("data-name");
	var apiKey = "dc6zaTOxFJmzC";
	//NEEDS TO BE COMPLETED
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey ;
	//AJAX call for gif button being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(this.url);
		console.log(response);
		//creates a div to hold the gif
		var gifView = document.getElementById('gif-views');
		//creates a paragraph to format the rating
		var rating = document.createElement('p');
		//creates an image element
		var img = document.createElement('img');
		//creates wrapper to hold all elements
		var wrapper = document.createElement('div');

		//retrieve rating data. Need JSON to get these right.
		var ratingData = response.Rated;
		//retrieve image. Need JSON to get these right.
		var gifUrl = ;

		rating.innerHTML = ratingData;
		//is 'src' a predefined method?
		img.src = gifUrl;

		//displays gif and rating
		wrapper.appendChild(rating);
		wrapper.appendChild(img);
	});
}

//function for redering the gif
function renderButtons(){
	//removes gifs before adding new ones to avoid duplicates
	$("#buttons-views").empty();
	//loops through topics array
	for (var i = 0; i < topics.length; i++) {
		//dynamically create buttons
		var a = $("<buttons>");
		//add class of btn
		a.addClass("btn");
		//add data-name attribute
		a.attr("data-name", topics[i]);
		//add text to the buttons
		a.text(topics[i]);
		//add buttons to the buttons-view div
		$("#buttons-views").append(a);
	}
}
	//even handlers
	$("#add-gifs").on("click", function(event){
		event.preventDefault();
		//grabs added gifs from text field
		var gif = $("topic-input").val().trim();
		//pushes added gifs to the topics array
		topics.push(gif);
		//calls the renderButtons function
		renderButtons();
	});