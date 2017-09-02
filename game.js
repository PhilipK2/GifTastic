var games = ["Rocket League", "Bloodborne", "The Witcher 3", "Overwatch", "Madden", "Battlefield 1", "Hearthstone"];
console.log(games);

// Creates first buttons // 
function renderButtons() {
    $("#buttonBox").empty();
    for (var i = 0; i < games.length; i++) {
        var myButton = $("<button>");
        myButton.addClass("game");
        myButton.addClass('btn btn-primary');
        myButton.attr("data-name", games[i]);
        myButton.text(games[i]);
        $("#buttonBox").append(myButton);
        //console.log(myButton);
    }
}
// Pushes user input into buttons //
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var addBtn = $("#search").val().trim();
    games.push(addBtn);
    renderButtons();
});


// Filling the field with Gifs //
$(document).on("click", ".game", function(event) {
    var game = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gameDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            gameDiv.append('<img class="gif" src="' + results[i].images.fixed_height_still.url + '">');
            gameDiv.append(p);
            $("#gifBox").append(gameDiv);
        }
    });
    $("#gifBox").empty();
});

renderButtons();

// On Click function to switch between still and moving //
$('#gifBox').on('click', '.gif', function() {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }

});