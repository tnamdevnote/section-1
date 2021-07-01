"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const favoriteStatus = currentUser.favorites.some(favorite => favorite.storyId === story.storyId) ? "fas" : "far";
  const hostName = story.getHostName();
  const li = document.createElement('li');
  li.setAttribute('id', `${story.storyId}`);
  li.innerHTML = `
      <i class="${favoriteStatus} fa-star"></i>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
  `
  return li
    ;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  allStoriesList.innerHTML = '';

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    allStoriesList.append($story);
  }

  allStoriesList.classList.remove('hidden');
}

function putFavStoriesOnPage() {

  favStoriesList.innerHTML = '';

  currentUser.favorites.forEach(favorite => {
    const favStory = generateStoryMarkup(favorite);
    favStoriesList.append(favStory);
  })
  allStoriesList.classList.add('hidden');
  favStoriesList.classList.remove('hidden');
}

async function onClickSubmit(evt) {
  console.log('onClickSubmit', evt);
  evt.preventDefault();
  const author = document.querySelector('#submit-author').value;
  const title = document.querySelector('#submit-title').value;
  const url = document.querySelector('#submit-url').value;

  const newStory = await storyList.addStory(currentUser, { author, title, url });
  storyList.stories.unshift(newStory);
  putStoriesOnPage();
  storySubmitForm.classList.add('hidden');
}

storySubmitForm.addEventListener('submit', onClickSubmit);

function toggleFavorite(evt) {
  console.debug("toggleFavorite")
  const storyId = evt.target.parentElement.id;
  const username = currentUser.username;
  const token = currentUser.loginToken;
  //favorite
  if (evt.target.classList[0] === 'far') {
    evt.target.classList.replace('far', 'fas');
    User.favorite(token, username, storyId);
  } //unfavorite
  else if (evt.target.classList[0] === 'fas') {
    evt.target.classList.replace('fas', 'far');
    User.unFavorite(token, username, storyId);
  }
}

storiesContainer.addEventListener('click', toggleFavorite);