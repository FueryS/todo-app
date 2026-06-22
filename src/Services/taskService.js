import { getSession } from "./cookieService";

/**
 * THIS FILE HAS THE SERVICES RELATED TO TASKS:
 *
 * This file communicates with the backend task routes.
 * UI should not call fetch directly.
 * Every function must return a predictable object shape.
 *
 * Return shape:
 * {
 *   success: boolean,
 *   message: string,
 *   value: any,
 *   error: string | null
 * }
 */

/**
 * Creates a standard service response.
 *
 * @param {boolean} success operation status.
 * @param {string} message safe message for UI/testing.
 * @param {any} value returned data.
 * @param {string|null} error error message or null.
 * @returns {{success: boolean, message: string, value: any, error: string | null}}
 */
function createServiceResponse(success, message, value, error) {
  return {
    success,
    message,
    value,
    error,
  };
}

/**
 * Gets session safely before making authenticated task requests.
 *
 * @returns {{success: boolean, message: string, value: string|null, error: string|null}}
 */
function getSafeSession() {
  const jwt = getSession();

  if (!jwt) {
    return createServiceResponse(
      false,
      "You must login before using task features.",
      null,
      "Missing Session",
    );
  }

  return createServiceResponse(true, "Session found.", jwt, null);
}

/**
 * Creates headers with JWT/session authentication.
 *
 * @param {boolean} hasBody true when request has JSON body.
 * @returns {{success: boolean, message: string, value: Object|null, error: string|null}}
 */
function createAuthHeaders(hasBody = false) {
  const session = getSafeSession();

  if (!session.success) {
    return session;
  }

  const headers = {
    authorization: session.value,
  };

  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  return createServiceResponse(true, "Headers created.", headers, null);
}

/**
 * Safely extracts JSON from backend response.
 *
 * @param {Response} response fetch response.
 * @returns {Promise<Object>}
 */
async function extractJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

/**
 * Converts backend task response into a frontend-safe array.
 *
 * Backend can return:
 * - Array of tasks
 * - Single welcome object when no tasks exist
 *
 * @param {any} data backend data.
 * @returns {Array}
 */
function normalizeTaskList(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === "object") {
    return [data];
  }

  return [];
}

/**
 * Fetches all tasks of the logged-in user.
 *
 * @returns {Promise<{success: boolean, message: string, value: Array, error: string|null}>}
 */
export async function fetchAllTask() {
  try {
    const headers = createAuthHeaders(false);

    if (!headers.success) {
      return createServiceResponse(false, headers.message, [], headers.error);
    }

    const response = await fetch("/api/getAllTask", {
      method: "GET",
      headers: headers.value,
    });

    const data = await extractJson(response);

    if (!response.ok) {
      return createServiceResponse(
        false,
        data.message || "Failed to fetch tasks.",
        [],
        data.error || `HTTP Error ${response.status}`,
      );
    }

    return createServiceResponse(
      true,
      "Tasks fetched successfully.",
      normalizeTaskList(data),
      null,
    );
  } catch (e) {
    return createServiceResponse(
      false,
      "Unexpected error while fetching tasks.",
      [],
      e.message,
    );
  }
}

/**
 * Adds a new task for the logged-in user.
 *
 * @param {string} title task heading.
 * @param {string} body task description.
 * @param {string|null} date task date.
 * @returns   {Promise<{success: boolean, message: string, value: Object|null, error: string|null}>}
 */
export async function addTask(title, body, date) {
  try {
    const headers = createAuthHeaders(true);

    if (!headers.success) {
      return createServiceResponse(false, headers.message, null, headers.error);
    }

    if (!title || title.trim() === "") {
      return createServiceResponse(
        false,
        "Task title is required.",
        null,
        "Validation Error",
      );
    }

    const taskData = {
      Heading: title,
      Discription: body,
      Date: date,
    };

    const response = await fetch("/api/addTask", {
      method: "POST",
      headers: headers.value,
      body: JSON.stringify(taskData),
    });

    const data = await extractJson(response);

    if (!response.ok) {
      return createServiceResponse(
        false,
        data.message || "Failed to add task.",
        null,
        data.error || `HTTP Error ${response.status}`,
      );
    }

    return createServiceResponse(true, "Task added successfully.", data, null);
  } catch (e) {
    return createServiceResponse(
      false,
      "Unexpected error while adding task.",
      null,
      e.message,
    );
  }
}

/**
 * Updates task status.
 *
 * @param {string} target task id.
 * @param {boolean} value new status value.
 * @returns {Promise<{success: boolean, message: string, value: Object|null, error: string|null}>}
 */
export async function updateTask(target, value) {
  try {
    const headers = createAuthHeaders(true);

    if (!headers.success) {
      return createServiceResponse(false, headers.message, null, headers.error);
    }

    if (!target || target.trim() === "") {
      return createServiceResponse(
        false,
        "Task id is required.",
        null,
        "Validation Error",
      );
    }

    const response = await fetch(`/api/update/${target}`, {
      method: "PUT",
      headers: headers.value,
      body: JSON.stringify({ status: value }),
    });

    const data = await extractJson(response);

    if (!response.ok) {
      return createServiceResponse(
        false,
        data.message || "Failed to update task.",
        null,
        data.error || `HTTP Error ${response.status}`,
      );
    }

    return createServiceResponse(
      true,
      "Task updated successfully.",
      data,
      null,
    );
  } catch (e) {
    return createServiceResponse(
      false,
      "Unexpected error while updating task.",
      null,
      e.message,
    );
  }
}

/**
 * Deletes a task by id.
 *
 * @param {string} target task id.
 * @returns {Promise<{success: boolean, message: string, value: Object|null, error: string|null}>}
 */
export async function deleteTask(target) {
  try {
    const headers = createAuthHeaders(false);

    if (!headers.success) {
      return createServiceResponse(false, headers.message, null, headers.error);
    }

    if (!target || target.trim() === "") {
      return createServiceResponse(
        false,
        "Task id is required.",
        null,
        "Validation Error",
      );
    }

    const response = await fetch(`/api/delete/${target}`, {
      method: "DELETE",
      headers: headers.value,
    });

    const data = await extractJson(response);

    if (!response.ok) {
      return createServiceResponse(
        false,
        data.message || "Failed to delete task.",
        null,
        data.error || `HTTP Error ${response.status}`,
      );
    }

    return createServiceResponse(
      true,
      data.message || "Task deleted successfully.",
      data,
      null,
    );
  } catch (e) {
    return createServiceResponse(
      false,
      "Unexpected error while deleting task.",
      null,
      e.message,
    );
  }
}
