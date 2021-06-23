"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

body.addEventListener("click", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  loginForm.show();
  signupForm.show();
}

navLogin.addEventListener("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  // document.querySelector(".main-nav-links").style.display = 'block'
  // // $(".main-nav-links").show();
  navLogin.style.display = 'none';
  navLogOut.style.display = 'block';
  navUserProfile.append(`${currentUser.username}`)
  navUserProfile.style.display = 'block';
}
