import Parse from "./parseConfig";

const columnCreatedAt = "createdAt"; //The date of which the entry was created
const columTitle = "title";
const columnBody = "description";
const columnStatis = "completed";
const columnDueDate = "duedate";
const columnObjectID = "objectId";

export const fetchAllTask = async () => {
  try {
    const response = await fetch("/api/getAllTask");
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const addTask = async (title, body, date) => {
  try {
    const data = { Heading: title, Discription: body, Date: date };

    console.log(data);

    const response = await fetch("/api/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Success: ", result);
    return result;
  } catch (e) {
    console.error("Error during POST request:", e);
    return [];
  }
};

export const updateTask = async (target, value) => {
  try {
    const data = { status: value };

    const query = await fetch(`/api/update/${target}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!query.ok) {
      console.log("HTTP Error: ", query.status);
      return [];
    }

    console.log("Success update");

    return query;
  } catch (e) {
    console.log("Update failed: ", e);
    return [];
  }
};

export const deleteTask = async (target) => {
  try {
    const query = await fetch(`/api/delete/${target}`, {
      method: "DELETE",
    });

    if (!query.ok) {
      console.log("HTTP Error!: ", query);
      return [];
    }

    return query;
  } catch (e) {
    console.log(e);
    return [];
  }
};
