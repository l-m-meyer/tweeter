/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// use to empty tweets
// $('.tweet-container').empty();

const renderTweets = (tweets) => {
  //takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    $('.tweet-container').prepend(createTweetElement(tweet));
  }
};

// takes in a tweet object and returns a tweet <article>
const createTweetElement = (data) => {
    
  let $tweet = $(`
  <article class="tweet">
    <header class="name-avatar">
      <div>
        <img src="${data.user.avatars}"></img>
        <h4 class="username">${data.user.name}</h4>
      </div>
      <h4 class="userHandle">${data.user.handle}</h4>
    </header>
    <p>${data.content.text}</p>
    <footer>
      <output class="footer--date">${timeago.format(data.created_at)}</output>
      <div class="footer--icons">
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
    if (!$('#tweet-text').val().length) alert('Your tweet is empty!');
    if ($('#tweet-text').val().length > 140) alert('Shorten your tweet!');
    else { 
      $.post('/tweets', query)
        .then(() => loadTweets());
    }
  })
});