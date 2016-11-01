$(document).ready(function () {
  var question = '',
      colors = [
        {name: 'red', value: 'red'},
        {name: 'green', value: 'green'},
        {name: 'yellow', value: 'yellow'},
        {name: 'blue', value: 'blue'}
      ],
      $question = $('#question'),
      $colors = $('.color');

  $colors.each(function (i) {
    this.style.backgroundColor = colors[i].value;
  });

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

  for (var i = 0; i < 20; i++) {
    console.log(randomColor(colors).name);
  }
});
