let buttons = ["Android", "Google", "Samsung"];

function alertGiphyName() {

  //assigns the data-name attribbute to be entered into the api link
  var giphyName = $(this).attr("data-name");
  var api_key = "console.log(buttons);"
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  giphyName + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(JSON.stringify(response))

  });

  console.log(giphyName);

};

function renderButtons() {

  // Delete the content inside the buttons-view div prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Loop through the array of buttons, then generate buttons for each movie in the array

  for(let i = 0; i < buttons.length; i++)
  {
    //creates the button and sets it to a vairable
    btn = $("<button>");

    //names the button text the name pushed to the array
    btn.text(buttons[i]);

    //adds bootstrap styling to the button
    btn.addClass("btn-primary giphy");

    //attributes the name of the button as a data value
    btn.attr("data-name", buttons[i]);

    //appends the button to the page
    $("#buttons-view").append(btn);
  }

}

// This function handles events where the add movie button is clicked

$("#add-giphy").on("click", function (event) {

  event.preventDefault();

  // Write code to grab the text the user types into the input field

  var button = $("#giphy-input").val().trim();
  //.trim() gets rid of extra whitespace in front and behind
  // Write code to add the new giphy into the buttons array

  buttons.push(button);
  // The renderButtons function is called, rendering the list of giphy buttons

  renderButtons();
});

$(document).on("click", ".giphy", alertGiphyName);

// Calling the renderButtons function to display the initial list of movies
renderButtons();