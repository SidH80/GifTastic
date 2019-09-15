console.log("hooked up");

let buttons = [ 'Android', 'Samsung', 'Google'];

const api_key = 'lJvuzysSVwN88IM6jlOuplJ3f43YhmxW'

function displayGiphy() {

  var giphy = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=cats";

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=cats" ,
    method: "GET"
  }).then(function (response) {

    //  for(var i = 0; i < buttons.length; i++)
    //      {
    //        var gifDiv = $("<div>");

    //        var rating = results[i].rating;

    //        var p = $("<p>").text("Rating: " + rating);

    //        var personImage = $("<img>");
    //        personImage.attr("src", results[i].images.fixed_height.url);

    //        gifDiv.prepend(p);
    //        gifDiv.prepend(personImage);

    //        $("#giphy-view").prepend(gifDiv);
    //      }

    console.log(response);
  });

}

function renderButtons() {

  $("#buttons-view").empty();

  // Loops through the array of movies
  for(var i = 0; i < buttons.length; i++)
  {

    var a = $("<button>");

    a.addClass("giphy btn-primary");

    a.attr("data-name", buttons[i]);

    a.text(buttons[i]);

    $("#buttons-view").append(a);
  }
}

// This function handles events where the add movie button is clicked
$("#add-giphy").on("click", function (event) {
  event.preventDefault();

  var giphy = $("#giphy-input").val().trim();

  buttons.push(giphy);

  renderButtons();

});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".giphy", displayGiphy);

// Calling the renderButtons function to display the intial buttons
renderButtons();