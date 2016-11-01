$(document).ready(function () {
  var colors = [
        {name: 'red', value: 'red'},
        {name: 'green', value: 'green'},
        {name: 'yellow', value: 'yellow'},
        {name: 'blue', value: 'blue'}
      ],
      $question = $('#question'),
      $colors = $('.color');

  // Add colors to divs
  $colors.each(function (i) {
    this.style.backgroundColor = colors[i].value;
  });

  // Start the game by asking the first question
  askColor(randomColor(colors).name, $question);

  // String, jQuery object -> void
  // Change text of jQuery object to question about color
  function askColor(color, $q) {
    $q.text('Can you click on ' + color + '?');
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
