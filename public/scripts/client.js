/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// prevents cross-site scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//prepends tweet to the tweets container
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    $('.tweet-container').prepend(createTweetElement(tweet));
  }
};

// generates HTML for new tweet to be rendered
const createTweetElement = (data) => {
    
  let $tweet = $(`
  <article class="tweet">
    <header class="tweet__header">
      <div>
        <img src="${data.user.avatars}"></img>
        <h4 class="tweet--name">${data.user.name}</h4>
      </div>
      <h4 class="tweet--handle">${data.user.handle}</h4>
    </header>
    <p class="tweet--content">${escape(data.content.text)}</p>
    <footer class="tweet__footer">
      <output class="footer--date">${timeago.format(data.created_at)}</output>
      <div class="footer__icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
};

$(() => {
  const loadTweets = () => {
    $.get('/tweets').then(tweets => {
      console.log('tweets: ', tweets);
      renderTweets(tweets);
    });
  };

  loadTweets();
  
  // event listener
  $('.new-tweet--form').submit(function(e) {
    e.preventDefault();
    const query = $(this).serialize();
    $('#tweet-text').on('input', () => $('#error').slideUp('slow'));
    
    if (!$('#tweet-text').val().length) {
      $('#error').html('⛔ Tweet too short! ⛔').slideDown('slow');
    } if ($('#tweet-text').val().length > 140) {
      $('#error').html('⛔ Tweet too long! Keep it under 140! ⛔').slideDown('slow');
    } else {
      $.post('/tweets', query).then(() => {
        $('.tweet-container').empty();
        loadTweets();
        $('.new-tweet--form').trigger('reset');
        $('.counter').html('140');
      });
    }
  });
});