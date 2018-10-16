//Array for animal buttons
var animalButtons = [
    "cat",
    "dog",
    "frog",
    "goat",
    "cow",
    "horse",
    "ferret",
    "hamster"
];

// References to buttons div and gif div
var buttonsDiv = $("#buttons");
var gifsDiv = $("#gifs");

createButtons();

function createButtons() {

    // Clear buttonsDiv
    buttonsDiv.empty();

    // Make a button for each animal in animalButtons
    for (var i = 0; i < animalButtons.length; i++) {
        var button = $("<button>");
        button.text(animalButtons[i]);
        button.addClass("button");
        button.attr("data-animal", animalButtons[i]);
        buttonsDiv.append(button);
    };
}

function addButton() {

    // Get user input and store it in the animalButtons array
    var newAnimal = $("#userAnimal").val();
    animalButtons.push(newAnimal);
    
    // Display updated animalButtons and clear search input
    createButtons();
    $("#userAnimal").val("");
}

$(document).on("click", ".button", function() {

    // Clear gifsDiv
    gifsDiv.empty();

    // Variable for search term and query url for giphy searches
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ animal +"&api_key=sO9mZu6TPE69DgL2wcFBJ9iDU879uVdG";

    // AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        // Get 10 gifs
        for (var i = 0; i < 10; i++) {

          // Check if the gif has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Div for the gif
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");

            // Div for gif info
            var infoDiv = $("<div>");
            infoDiv.addClass("infoDiv");
            infoDiv.css("width", results[i].images.fixed_height_still.width);

            // Store the gif's title
            var title = results[i].title;

            // Store the gif's rating
            var rating = results[i].rating;

            // Paragraphs for title and rating
            var pRating = $("<p>").text("Rating: " + rating);
            var pTitle = $("<p>").text("Title: " + title);

            // Image tag for gif...give image "gif" class
            var animalImage = $("<img>");
            animalImage.addClass("gif");

            // Pull the src of the gif from results (make it still to start)
            animalImage.attr("src", results[i].images.fixed_height_still.url);

            // Give each image attributes for being still/animating
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");

            // Append paragraphs to infoDiv
            infoDiv.append(pTitle);
            infoDiv.append(pRating);
            
            // Append infoDiv and animalImage to gifDiv
            gifDiv.append(infoDiv);
            gifDiv.append(animalImage);

            // Prepending the gifDiv to gifsDiv
            gifsDiv.prepend(gifDiv);
          }
        }

        $(".gif").on("click", function() {

            // Store current state of the gif
            var state = $(this).attr("data-state");
        
            // If gif is still, animate it. If it is animated, make it still.
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
          });
      });
  });

  