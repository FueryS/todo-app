import { useState } from "react";
import {
  fetchAllTask,
  addTask,
  updateTask,
  deleteTask,
} from "../Services/TaskService";
import { getSession } from "../Services/CookieService";

export default function TaskTesting() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [targetId, setTargetId] = useState("");
  const [statusValue, setStatusValue] = useState(false);
  const [result, setResult] = useState(null);
  const [tasks, setTasks] = useState([]);

  async function handleFetchTasks() {
    const response = await fetchAllTask();

    setResult(response);

    if (response.success) {
      setTasks(response.value);
    }
  }

  async function handleAddTask() {
    const response = await addTask(title, body, date);

    setResult(response);

    if (response.success) {
      await handleFetchTasks();
    }
  }

  async function handleUpdateTask() {
    const response = await updateTask(targetId, statusValue);

    setResult(response);

    if (response.success) {
      await handleFetchTasks();
    }
  }

  async function handleDeleteTask() {
    const response = await deleteTask(targetId);

    setResult(response);

    if (response.success) {
      await handleFetchTasks();
    }
  }

  return (
    <div>
      <h1>Task Testing</h1>

      <p>
        <strong>Current Session:</strong> {getSession() ?? "No Session Found"}
      </p>

      <hr />

      <h2>Add Task</h2>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button onClick={handleAddTask}>Add Task</button>

      <hr />

      <h2>Fetch Tasks</h2>

      <button onClick={handleFetchTasks}>Fetch All Tasks</button>

      <hr />

      <h2>Update / Delete Task</h2>

      <div>
        <label>Target Task ID</label>
        <input
          type="text"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
        />
      </div>

      <div>
        <label>Status</label>
        <select
          value={String(statusValue)}
          onChange={(e) => setStatusValue(e.target.value === "true")}
        >
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
      </div>

      <button onClick={handleUpdateTask}>Update Task Status</button>
      <button onClick={handleDeleteTask}>Delete Task</button>

      <hr />

      {result && (
        <div>
          <h2>Last Result</h2>

          <p>
            <strong>Success:</strong> {String(result.success)}
          </p>

          <p>
            <strong>Message:</strong> {result.message}
          </p>

          <p>
            <strong>Error:</strong> {result.error ?? "None"}
          </p>

          <pre>{JSON.stringify(result.value, null, 2)}</pre>
        </div>
      )}

      <hr />

      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks loaded.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id ?? task.Heading}>
            <p>
              <strong>ID:</strong> {task._id ?? "No ID"}
            </p>

            <p>
              <strong>Heading:</strong> {task.Heading}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {task.Discription ?? "No Description"}
            </p>

            <p>
              <strong>Date:</strong> {task.Date ? String(task.Date) : "No Date"}
            </p>

            <p>
              <strong>Status:</strong> {String(task.status)}
            </p>

            <button onClick={() => setTargetId(task._id ?? "")}>
              Select This Task
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}
