// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<a href='http://www.huffingtonpost.ca" + data[i].link + "' target='_blank'>" + " (Visit this news article)" + "</a></p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the news from the news section
  $("#note").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the news information to the page
    .then(function(data) {
      console.log(data);
      $("#note").append("<p><strong>" + data.title + "</strong></p>" + "<br/><h3>" + "Comment" + "</h3>");
      $("#note").append("<input id='titleinput' name='title' >");
      $("#note").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#note").append("<br/><button class='btn btn-primary' data-id='" + data._id + "' id='savenews'>Save news article & comment</button>");

      // If there's a news in the article
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenews button
$(document).on("click", "#savenews", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/save/" + thisId
    }).done(function(data) {
      window.location = "/"
    })

  // Also, remove the values entered in the input and textarea for news entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

//Handle Delete Article button
$(".delete").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
  }).done(function(data) {
      window.location = "/saved"
  })
});
