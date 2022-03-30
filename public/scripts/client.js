/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// use to empty tweets
// $('.tweet-container').empty();

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1648484086955
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1648570486955
  }
];

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
      <output class="footer--date">${data.created_at} days ago</output>
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
  
  renderTweets(data);
  // event listener
  $('.new-tweet--form').submit(function(e) {
    e.preventDefault();
    const query = $(this).serialize();
    console.log(query);
    $.post('/tweets', query)
      // .then( tweet => {
      // renderTweets(tweet);
    // });
  })
});