"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

const navAllStories = (evt) => {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

navAll.addEventListener("click", navAllStories);

/** Show login/signup on click on "login" */

const navLoginClick = (evt) => {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  loginForm.classList.remove('hidden');
  signupForm.classList.remove('hidden');
}

navLogin.addEventListener("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

const updateNavOnLogin = () => {
  console.debug("updateNavOnLogin");
  // document.querySelector(".main-nav-links").style.display = 'block'
  navLogin.style.display = 'none';
  navLogOut.classList.remove('hidden');
  navUserProfile.append(`${currentUser.username}`)
  navUserProfile.classList.remove('hidden');
}

// Show Submit Form
const navSubmitStory = () => {
  storySubmitForm.classList.toggle('hidden');
}

navSubmit.addEventListener("click", navSubmitStory)

// Show Favorited stories
const navFavoriteStory = () => {
  hidePageComponents();
  favStoriesList.classList.remove('hidden');
  putFavStoriesOnPage();
}
navFavorite.addEventListener("click", navFavoriteStory);

// Show list of stories that I submitted
const navMyStories = () => {
  hidePageComponents();
  myStoriesList.classList.remove('hidden');
  putMyStoriesOnPage();
}
navMyStory.addEventListener('click', navMyStories)