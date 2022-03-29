$(document).ready(function() {
  let counter = 140;
  $('#tweet-text').on('input', function(e) {
    let len = $(this).val().length;
    let remainder = counter - len;
    
    $('.counter').text(remainder);
    if (remainder < 0) {
      $('.counter').css('color', 'red')
    } else {
      $('.counter').css('color', 'black')
    }
  });
});