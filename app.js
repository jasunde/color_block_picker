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
      winningColor = '',
      sequence = [],
      currentSequence = [],
      roundTimer,
      speed = 3000,
      gameOn = true;

  // Add colored divs
  colors.forEach(function (color) {
    var $newColor = $('<div></div>')
      .css('background-color', color.value)
      .addClass('color')
      .data('color', color.name);

    $colors.append($newColor);
  });

  // Start the game by asking the first question
  startRound();

  // Listen for a click on a color
  $colors.on('click', '.color', function (event) {
    if(gameOn) {
      if(isWinner(this)) {
        clearTimeout(roundTimer);
        cueColor(this);
        $feedback.text('You got it!');
        setTimeout(function () {
          if(currentSequence.length > 0) {
            currentSequence = nextColor(currentSequence);
          } else {
            startRound();
          }
        }, 2000);
      } else {
        $feedback.text('Oops... Try again!')
      }
    }
  });

  // void -> void
  // Start a round
  function startRound() {
    sequence.push(pickColor(colors));
    currentSequence = sequence.slice();
    playSequence(currentSequence);
    currentSequence = sequence.slice();
    currentSequence = nextColor(currentSequence);
  }

  // void -> void
  function gameOver() {
    gameOn = false;
    $feedback.text('Game Over');
  }

  // void -> void
  function playSequence(sequence) {
    sequence.forEach(function (color) {
        $color = $colors.find('.color');

        for (var i = 0; i < $color.length; i++) {
          var currentColor = $($color[i]);
          if(currentColor.data('color') === color) {
            var element = currentColor;
          }
        }
        cueColor(element[0]);
    });
  }

  // Array -> Array
  // Start the countdown for the next color in the color sequence
  function nextColor(array) {
    console.log(sequence, currentSequence);
    winningColor = askColor(array.shift(), $question);
    roundTimer = setTimeout(function () {
      gameOver();
    }, speed);
    // console.log(sequence, array);
    return array;
  }

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

  // String, jQuery object -> String
  // Change text of jQuery object to question about color
  function askColor(color, $q) {
    $q.text('Can you click on ' + color + '?');
    return color;
  }

  // Colors Array -> String
  // Returns a random color from the colors array
  function pickColor(colors) {
    return randomColor(colors).name;
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
