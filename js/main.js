"use strict";
// So we don't have to keep re-finding things on page, find DOM elements once:

const body = document.querySelector('body');

const storiesContainer = document.querySelector(".stories-container")
const storySubmitForm = document.querySelector("#submit-form");
const storiesLoadingMsg = document.querySelector("#stories-loading-msg");
const allStoriesList = document.querySelector("#all-stories-list");
const favStoriesList = document.querySelector("#fav-stories-list");

const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");

const navAll = document.querySelector("#nav-all");
const navSubmit = document.querySelector("#nav-submit");
const navFavorite = document.querySelector("#nav-favorite");
const navLogin = document.querySelector("#nav-login");
const navUserProfile = document.querySelector("#nav-user-profile");
const navLogOut = document.querySelector("#nav-logout");

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    allStoriesList,
    favStoriesList,
    storySubmitForm,
    loginForm,
    signupForm,
  ];
  components.forEach(c => c.classList.add('hidden'));
}

/** Overall function to kick off the app. */
async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
document.addEventListener("DOMContentLoaded", start)
  ;
