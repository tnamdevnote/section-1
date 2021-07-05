"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */
const login = async (evt) => {
  console.debug("login", evt);
  evt.preventDefault();
  // grab the username and password
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;

  // User.login retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.

  currentUser = await User.login(username, password);

  if (currentUser) {
    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
    navAllStories();
    loginForm.reset();
  }

}

loginForm.addEventListener("submit", login);

/** Handle signup form submission. */

const signup = async (evt) => {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = document.querySelector("#signup-name").value;
  const username = document.querySelector("#signup-username").value;
  const password = document.querySelector("#signup-password").value;

  // User.signup retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.signup(username, password, name);

  if(currentUser) {
    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
    navAllStories();
    signupForm.reset();
  }
  

  
}

signupForm.addEventListener("submit", signup);

/** Handle click of logout button
 *
 * Remove their credentials from localStorage and refresh page
 */

const logout = (evt) => {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}

navLogOut.addEventListener("click", logout);

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */

const checkForRememberedUser = async () => {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  // try to log in with these credentials (will be null if login failed)
  currentUser = await User.loginViaStoredCredentials(token, username);
}

/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

const saveUserCredentialsInLocalStorage = () => {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

const updateUIOnUserLogin = () => {
  console.debug("updateUIOnUserLogin");

  allStoriesList.classList.remove('hidden');
  updateNavOnLogin();
}
