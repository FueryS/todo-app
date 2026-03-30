import "./components.css";
import { useState } from "react";
import { addTask } from "../taskService";

function TaskForm() {
  const [Title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");

  const onClick = () => {
    addTask(Title, body, date);
  };

  return (
    <div className="task-form">
      <h2>Add Task</h2>
      <form>
        <input
          className="input-main"
          type="text"
          placeholder="Title"
          value={Title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <textarea
          className="input-second"
          placeholder="Description"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
        <br />
        <input
          className="input-date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <br />
        <button type="submit" className="input-submit" onClick={onClick}>
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
