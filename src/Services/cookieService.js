/**
 * THIS FILE HAS THE SERVICES RELATED TO COOKIES:
 *
 * This file uses the other service files to set cookies.
 * The option for deleting every single type of cookie must be there.
 * In future the JWT must use HTTP cookie instead.
 *
 * Design choices:
 *      - Use document.cookie to ensure it behaves like a low level service.
 *      - In case a function is calling another function and setting cookie based on that, you still must define a raw function that sets that cookie.
 *          eg: setSession calling login function and setSessionCookie function.
 */

import { logIn } from "./LoginService";

const JWT_KEY = "jwt"; // key for JWT only

/**
 * Deletes the given cookie
 * @param {string} key the key for the cookie you want to delete
 * @returns {boolean} true when the deletion was success
 */
export function deleteCookie(key) {
  if (!key || key === "") {
    throw new Error("Cookie key cannot be empty.");
  }

  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

  return true;
}

/**
 * Gets the value of a cookie by key.
 *
 * @param {string} key The cookie key.
 * @returns {string|null} Cookie value or null if not found.
 */
export function getCookie(key) {
  if (!key || key === "") {
    throw new Error("Cookie key cannot be empty.");
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${key}=`));

  if (!cookie) {
    return null;
  }

  return cookie.split("=")[1];
}

/**
 * Sets the cookie ["jwt"] with the given value.
 * Right now its designed to store _id in the browser in future use JWT and HTTP token
 * @param {string} jwt the Java Web Token strictly
 * @returns {boolean} true when the setting was a success.
 */
export function setSessionCookie(jwt) {
  if (!jwt || jwt === "") {
    throw new Error("jwt is not allowed to be empty.");
  }

  document.cookie = `${JWT_KEY}=${jwt}; path=/`;

  return true;
}

/**
 * set the session cookie while also calling the login function with the given pass and user
 * @param {string} User user name
 * @param {string} pass password
 * @returns {{success: boolean , message : string , value : string | null , error : string | null }}
 */
export async function setSession(User, pass) {
  const response = await logIn(User, pass);

  if (!response.success) {
    return response;
  }

  const settingCookie = setSessionCookie(response.value);

  if (!settingCookie) {
    return {
      success: false,
      message: "Login was successful but session cookie was not created.",
      value: null,
      error: "Cookie Error",
    };
  }

  localStorage.setItem("userName", response.userName || User);

  return response;
}

/**
 * Strictly deletes Session Cookie.
 * @returns {boolean} true when deletion was a success
 */
export function deleteSessionCookie() {
  return deleteCookie(JWT_KEY);
}

/**
 * Gets the current session token/JWT.
 *
 * @returns {string|null} Session value or null if not found.
 */
export function getSession() {
  return getCookie(JWT_KEY);
}
