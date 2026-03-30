import Parse from "./parseConfig";

const columnCreatedAt = "createdAt"; //The date of which the entry was created
const columTitle = "title";
const columnBody = "description";
const columnStatis = "completed";
const columnDueDate = "duedate";
const columnObjectID = "objectId";

export const fetchAllTask = async () => {
  try {
    //Create a query object
    const query = new Parse.Query(import.meta.env.VITE_PARSE_CLASS_NAME);

    //Sort everything in decending date so the most recent entry is at top
    query.descending(columnCreatedAt);

    //Find every entry in the data base
    const queryResult = await query.find();

    //Convert the result into a mapped json
    const result = queryResult.map((task) => ({
      id: task.id,
      ...task.toJSON(),
    }));

    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTask = async (title, body, date) => {
  try {
    //create a query Object
    const query = new Parse.Object(import.meta.env.VITE_PARSE_CLASS_NAME);

    //add data to the DB
    query.set(columTitle, title);
    query.set(columnBody, body);
    query.set(columnStatis, false);

    if (date) {
      //If date is not empty
      query.set(columnDueDate, new Date(date)); //convert the data type to date
    }

    //Save changes
    const savedQuery = await query.save();

    //Print result
    console.log({ id: savedQuery, ...savedQuery.toJSON() });

    //return the task immediatly, no need for UI to access the data base to update
    return { id: savedQuery.id, ...savedQuery.toJSON() };
  } catch (error) {
    console.log(error);
    return null; //UI will know its an error
  }
};

export const updateTask = async (target, value) => {
  try {
    //create a pointer to the class
    const query = new Parse.Object(import.meta.env.VITE_PARSE_CLASS_NAME);

    //tell parse which value needs to be changed
    query.set(columnObjectID, target);

    //set the value
    query.set(columnStatis, value);

    //save
    query.save();
    console.log("Updated task succesfully");
    return value;
  } catch (e) {
    console.log(target, value);
    console.log(e);
    return null;
  }
};

export const deleteTask = async (target) => {
  const query = new Parse.Object(import.meta.env.VITE_PARSE_CLASS_NAME);
  query.set(columnObjectID, target);
  try {
    await query.destroy();
    return null;
  } catch (e) {
    console.log("deleteTask():\n", e);
    return null;
  }
};
