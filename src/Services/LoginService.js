/**
 * LoginService.js
 *
 * This has all the required function that deals with login.
 *
 * Key design choice:
 *      - Predict errors that may occur in the backend like -
 *          weak password on sign up invalid user name format, and send failed directly from here reducing the backend traffic.
 *      - Each function must do exactly one Thing.
 *      - Each function is required to have a defined return type and it must not return any other data type at any condition.
 *      - Function must expect possible errors and return safely.
 */

const api = "./api/";

/**
 * Validates the provided credentials and sends a signup request to the backend.
 *
 * @param {string} user The username.
 * @param {string} pass The password.
 *
 * @returns {{
 *   success: boolean,
 *   message: string,
 *   error: string | null
 * }}
 * An object containing the operation result.
 */

export async function signUp(user, pass) {
  try {
    const response = await fetch(`${api}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, pass }),
    });
    const data = await response.json();
    if (!response.ok)
      return {
        success: false,
        message: data.message,
        error: data.error,
      };

    return {
      success: true,
      message: data.message,
      error: null,
    };
  } catch (e) {
    return {
      success: false,
      message: `Something Unexpected happen: ${e}`,
      error: "Unknown Error",
    };
  }
}

/**
 * Validates the provided credentials and sends a login request to the backend. the JWT is stored in value
 *
 * @param {string} User The username.W
 * @param {string} pass The password.
 *
 * @returns {{
 *   success: boolean,
 *   message: string,
 *   value: string,
 *   error: string | null
 * }}
 */
export async function logIn(User, pass) {
  try {
    const response = await fetch(`${api}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ User, pass }),
    });

    const data = await response.json();

    if (!response.ok)
      return {
        success: false,
        message: data.message,
        value: null,
        error: data.error,
      };

    return {
      success: true,
      message: data.message,
      value: data.value,
      userName: data.userName,
      error: null,
    };
  } catch (e) {
    return {
      success: false,
      message: "An unexpected error occured",
      value: null,
      error: "unknown error",
    };
  }
}
