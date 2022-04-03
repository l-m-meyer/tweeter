/*
* Submits new tweets.
*/

(($) => {
  $(() => {
    loadTweets();
    writeTweet();
  });
  
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
  
  // displays tweets from database to tweets container
  const loadTweets = () => {
    $.get('/tweets').then(tweets => {
      console.log('tweets: ', tweets);
      renderTweets(tweets);
    });
  };

  // adds new tweets to database to be displayed on page
  const writeTweet = () => {
    $('.new-tweet--form').submit(function(e) {
      e.preventDefault();

      const tweet = $('#tweet-text');
      const query = $(this).serialize();

      tweet.on('input', () => $('#error').slideUp('slow'));
      
      if (!tweet.val().trim().length) {
        $('#error').text('⛔ Don\'t be shy, write that tweet! ⛔').slideDown('slow');
      } else if (tweet.val().length > 140) {
        $('#error').text('⛔ Someone\'s gotta a lot to say, eh? Keep it under 140! ⛔').slideDown('slow');
      } else {
        $.post('/tweets', query).then(() => {
          $('.tweet-container').empty();
          loadTweets();
          $('.new-tweet--form').trigger('reset');
          $('.counter').text('140');
        });
      }
    });
  };
})(jQuery);