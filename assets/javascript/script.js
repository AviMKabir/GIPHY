

var animes = ["my hero academia", "hunter x hunter", "death note", "naruto"];




function displayAnimeInfo() {



        // catching the button clicked with this
        var anime = $(this).attr("data-name");
        // some variables to hold the editable parts of the link
        var apiKey = "rVACN8PXJGdFJVbnO8UQrFW3sJ6WDwAA";
        var limit = 10;

        // url to search for the name of the anime 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            anime + "&api_key=" + apiKey + "&limit=" + limit;

        // ajax get
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // get response
            .then(function (response) {


                // clear the last divs
                $(".animeGiphy").remove();
                $("p").remove();


                // Storing an array of results in the results variable
                var results = response.data;

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating got it from the assignment 
                    if (results[i].rating !== "r" ) {

                        // Creating a div for the gif
                        var showDiv = $("<div class='text-center'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        var defaultAnimatedSrc = results[i].images.fixed_height.url;
                        var staticSrc = results[i].images.fixed_height_still.url;
                        var showImage = $("<img class='img-fluid' >");


                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        // var animeImage = $("<img class = 'img-fluid' >");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        // animeImage.attr("src", results[i].images.fixed_height.url);
                        showImage.attr("src", staticSrc);
                        showImage.addClass("animeGiphy");
                        showImage.attr("data-state", "still");
                        showImage.attr("data-still", staticSrc);
                        showImage.attr("data-animate", defaultAnimatedSrc);
                        

                        showDiv.append(p);
                        showDiv.append(showImage);
                        $("#gifs-appear-here").prepend(showDiv);
                    }
                }
            });
    

            $("#anime-input").val("");


}


  
function renderButtons() {

    // Deleting the animes prior to adding new animes
    $("#buttons-view").empty();

    // Looping through the array of animes
    for (var i = 0; i < animes.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      var a = $("<button class='btn btn-warning' >");
      a.attr("id", "show");

      // Adding a class of anime-btn to our button
      a.addClass("anime-btn");
      // Adding a data-attribute
      a.attr("data-name", animes[i]);
      // Providing the initial button text
      a.text(animes[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }

    $("#anime-input").val("");

  }

  // This function handles events where a movie button is clicked
  $("#add-anime").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#anime-input").val().trim();

    // Adding movie from the textbox to our array
    animes.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "anime-btn"
  $(document).on("click", ".anime-btn", displayAnimeInfo);

  $(document).on("click", ".animeGiphy", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}



  // Calling the renderButtons function to display the intial buttons
  renderButtons();