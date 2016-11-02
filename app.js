$(document).ready(function () {
  var colors = [
        {name: 'red', value: 'hsl(0, 60%, 50%)'},
        {name: 'green', value: 'green'},
        {name: 'yellow', value: 'hsl(60, 80%, 50%)'},
        {name: 'blue', value: 'hsl(240, 40%, 50%)'},
        // {name: 'purple', value: 'purple'}
      ],
      $question    = $('#question'),
      $colors      = $('#colors'),
      $feedback    = $('#feedback'),
      winningColor = '';

  // Add colored divs
  colors.forEach(function (color) {
    var $newColor = $('<div></div>')
      .css('background-color', color.value)
      .addClass('color')
      .data('color', color.name);

    $colors.append($newColor);
  });

  // Start the game by asking the first question
  winningColor = askColor(colors, $question);

  // Listen for a click on a color
  $colors.on('click', '.color', function (event) {
    if(isWinner(this)) {
      cueColor(this);
      $feedback.text('You got it!');
      setTimeout(function () {
        winningColor = askColor(colors, $question);
      }, 2000);
    } else {
      $feedback.text('Oops... Try again!')
    }
  });

  // HTML Element -> Boolean
  // Returns true if element color matches winning color
  function isWinner(element) {
    return $(element).data('color') == winningColor;
  }

  // HTML Element -> void
  // Alter the background-color of HTML Element
  function cueColor(el) {
    $(el).addClass('saturate');
    setTimeout(function () {
      $(el).removeClass('saturate');
    }, 2000);
  }

  // Array, jQuery object -> String
  // Change text of jQuery object to question about color
  // Return color name
  function askColor(colors, $q) {
    var color = randomColor(colors).name;
    $q.text('Can you click on ' + color + '?');
    return color;
  }

  // Colors Array -> Color Object
  // Returns a random color selected from the given array of colors
  function randomColor(colors) {
    return colors[randomNumber(0, colors.length - 1)];
  }

  // Integer, Integer -> Integer
  // Returns a random integer given a minimum and maximum integer
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
  }
});
