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
      speed = 1500,
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
  // playSequence(["red", "yellow", "red", "blue"]);

  // Listen for a click on a color
  $colors.on('click', '.color', function (event) {
    if(gameOn) {
      if(isWinner(this)) {
        clearTimeout(roundTimer);
        cueColor(this);
        $feedback.text('You got it!');

        if(currentSequence.length > 0) {
          gameOn = false;
          nextColor(currentSequence);
        } else {
          setTimeout(startRound, speed);
        }
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
  }

  // void -> void
  function gameOver() {
    gameOn = false;
    $feedback.text('Game Over');
  }

  // Color Array -> void
  // Lights each color in sequence for the give Array
  // Calls nextColor when no elements left in Color Array
  function playSequence(thisSequence) {

    console.log(thisSequence);
    gameOn = false;
    if(thisSequence.length) {
      var color = thisSequence.shift();
      $color = $colors.find('.color');

      for (var i = 0; i < $color.length; i++) {
        var currentColor = $($color[i]);
        if(currentColor.data('color') === color) {
          var element = currentColor;
        }
      }
      cueColor(element[0]);
      setTimeout(playSequence, speed, thisSequence);
    } else {
      currentSequence = sequence.slice();
      gameOn = true;
      $feedback.text('Go!!!')
      nextColor(currentSequence);
    }
  }

  // Array -> Array
  // Start the countdown for the next color in the color sequence
  function nextColor(array) {
    winningColor = askColor(array.shift(), $question);
    gameOn = true;
    roundTimer = setTimeout(function () {
      gameOver();
    }, speed);
    // return array;
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
    }, speed * .9);
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
