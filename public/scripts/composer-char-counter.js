$(document).ready(function() {
  let counter = 140;
  $('#tweet-text').on('input', function(e) {
    let len = $(this).val().length;
    let remainder = counter - len;
    const inputCounter = $(this).next().children()[1];
    $(inputCounter).text(remainder);
    if (remainder < 0) {
      $(inputCounter).css('color', 'red');
    } else {
      $(inputCounter).css('color', 'black');
    }
  });
});