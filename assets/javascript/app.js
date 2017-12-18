topicsVar= ["Batman", "Wonder Woman", "The Flash", "Aquaman"];
let currentButton = 0;



//RENDER INITIAL BUTTONS FUNCTION
let renderButton = () => {
	if (topicsVar[currentButton]){
			for (let topicsIndex = 0; topicsIndex < topicsVar.length; topicsIndex++) {
				let newSearchButton =  `<button type="button" value="${topicsVar[topicsIndex]}" class="searchButton btn btn-outline-success btn-lg">${topicsVar[topicsIndex]}</button>`;
				$(newSearchButton).text(topicsVar[topicsIndex]);
				$(newSearchButton).val(topicsVar[topicsIndex]);
				console.log(topicsVar[topicsIndex]);
				$('.buttonDiv').append(newSearchButton);
		}
	}
};

//RETRIEVE VALUUE FROM SEARCH INPUT AND STORE IN ARRAY
let retrieveSearch = () => {
	$('#userInput').on('click', function (event) {
		newTopics = [];
		event.preventDefault();
		let userSearch = $('#searchField').val().trim();
		console.log(userSearch);
		newTopics.push(userSearch);
		topicsVar.push(userSearch);
		console.log(topicsVar);
		console.log(newTopics);
		//clears search field after submit
		$('#searchForm').each(function(){
			this.reset();
		});
		if(typeof newTopics !== 'undefined' && newTopics.length > 0) {
			for(newButtonIndex = 0; newButtonIndex < newTopics.length; newButtonIndex++){
				let newSearchButton = `<button type="button" value="${newTopics[newButtonIndex]}" class="searchButton btn btn-outline-success btn-lg">${newTopics[newButtonIndex]}</button>`
				$(newSearchButton).text(newTopics[newButtonIndex]);
				$(newSearchButton).val(newTopics[newButtonIndex]);
				$('.buttonDiv').append(newSearchButton); 	
				getGifs();	
			}
		}
	});	
};

//AJAX API FUNCTION TO GET GIFS ON BUTTON CLICK
let getGifs = () => {
	$('.searchButton').on('click', function(){
		console.log('click');
		let userSearch = $(this).val();
		let apiKey = "gvdtQ8o8QZOF1N9jRr7QrvTk6U6ey5b1"
		console.log(userSearch);
		let queryURL = `https://api.giphy.com/v1/gifs/search?q=${userSearch}&api_key=${apiKey}&limit=10`
		$.ajax({
			url: queryURL,
			method: "GET",
		})
		.done(function (response) {
			let results = response.data;
			for(let resultIndex = 0; resultIndex < results.length; resultIndex++){
				let gifDiv = $("<div class='item'>");
				let rating = results[resultIndex].rating;
				let paragraphTag = $("<p>").text(`Rating: ${rating.toUpperCase(rating)}`);
				let imageTag = $('<img class="gif">');
				imageTag.attr("src", results[resultIndex].images.fixed_height.url);
				imageTag.attr("data-state", "animate");
				imageTag.attr("data-animate",results[resultIndex].images.fixed_height.url);
				imageTag.attr("data-still", results[resultIndex].images.fixed_height_still.url);

				gifDiv.append(paragraphTag);
				gifDiv.append(imageTag);
				
				$("#imageDiv").prepend(gifDiv);
				pauseGif();
				
				
			}
		})
		
	});
}
//PAUSE GIF FUNCTION
let pauseGif = () => {
	$(".gif").on("click", function () {
		console.log('click2')
		let state = $(this).attr('data-state');
		console.log(state);
		let stillSource = $(this).attr('data-still');
		let animateSource = $(this).attr('data-animate');
		if (state === 'animate') {
			$(this).attr('src', stillSource);
			$(this).attr('data-state', 'still');
		};
		if (state === 'still') {
			console.log('if still')
			$(this).attr('src', animateSource);
			$(this).attr('data-state', 'animate');
		}
	});
}




//MAIN FUNCTION THAT CONTAINS ALL OF THE APP
$(document).ready(function () {
	renderButton();

	retrieveSearch();
	getGifs();

});
