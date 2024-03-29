let buttons = ["Android", "Google", "Samsung", "HTC", "Verizon", "Apple", "T-Mobile", "Sprint"];

function renderGiphy() {

  //assigns the data-name attribbute to be entered into the api link
  var giphyName = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  giphyName + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=12";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data;

    console.log(results);

    $("#giphy-view").empty();
    // Looping over every result item
    for (var i = 0; i < results.length; i++) {

      // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        // Creating a div for the gif
        var gifDiv = $("<div>");

        // Storing the result item's rating
        var rating = results[i].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

        // Creating an image tag
        var giphyImage = $("<img>");

        giphyImage.addClass("giphy");

        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        giphyImage.attr("src", results[i].images.fixed_height_still.url);
        giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
        giphyImage.attr("data-animate", results[i].images.fixed_height.url);
        giphyImage.attr("data-state", "still");

        gifDiv.append(p);
        gifDiv.append(giphyImage);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#giphy-view").prepend(gifDiv);
      }
    }

  });



};

function renderButtons() {

  // Delete the content inside the buttons-view div prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Loop through the array of buttons, then generate buttons for each movie in the array

  for(let i = 0; i < buttons.length; i++)
  {
    //creates the button and sets it to a variable
    btn = $("<button>");

    //names the button text the name pushed to the array
    btn.text(buttons[i]);

    //adds bootstrap styling to the button
    btn.addClass("btn-primary button-render");

    //attributes the name of the button as a data value
    btn.attr("data-name", buttons[i]);

    //appends the button to the page
    $("#buttons-view").append(btn);
  }

}

$("#add-giphy").on("click", function (event) {

  event.preventDefault();

  var button = $("#giphy-input").val().trim();

  buttons.push(button);

  renderButtons();
});

$(document).on("click", ".button-render", renderGiphy);


$(document).on("click", "img", function(){

    var state = $(this).attr("data-state");
    console.log(this);

    if(state === "still")
    {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (state === "animate")
    {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

});
renderButtons();
