let buttons = ["Android", "Google", "Samsung"];

function renderGiphy() {

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
    //data dump works
    //$("#giphy-view").text(JSON.stringify(response));
    var results = response.data;

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
              giphyImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(giphyImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#giphy-view").prepend(gifDiv);

          }
        }

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

$(document).on("click", ".giphy", renderGiphy);

// Calling the renderButtons function to display the initial list of movies
renderButtons();