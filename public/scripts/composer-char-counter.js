/**
 * Displays remaining character counter.
 */
(($) => {
  $(() => {
    charCounter();
  });
  
  const charCounter = () => {
    $('#tweet-text').on('input', function(e) {
      let counter = 140;
      let len = $(this).val().length;
      let remainder = counter - len;
      const inputCounter = $(this).next().children()[1];
      $(inputCounter).text(remainder);
      if (remainder < 0) {
        $(inputCounter).css('color', 'var(--red)');
      } else {
        $(inputCounter).css('color', 'var(--darkred)');
      }
    });
  }
})(jQuery);