$(document).ready(function () {
  var colors = [
        {name: 'red', value: 'red'},
        {name: 'green', value: 'green'},
        {name: 'yellow', value: 'yellow'},
        {name: 'blue', value: 'blue'},
        {name: 'purple', value: 'purple'}
      ],
      $question = $('#question'),
      $colors = $('#colors'),
      $feedback = $('#feedback'),
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
      $feedback.text('You got it!');
      winningColor = askColor(colors, $question);
    } else {
      $feedback.text('Oops... Try again!')
    }
  });

  // HTML Element -> Boolean
  function isWinner(element) {
    return $(element).data('color') == winningColor;
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
