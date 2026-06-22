import "./components.css";
import { updateTask, deleteTask } from "../Services/taskService";

function TaskItem({ task, onToggle, onDelete }) {
  const handleComplete = async () => {
    // console.warn("handleComplete has not yet been implemented");
    const target = task._id;
    const value = !task.status;

    console.log(target);

    await updateTask(target, value);

    onToggle(target, value);
    console.log(task.status);
  };

  const handleDelete = async () => {
    // console.warn("handleDelete has not yet been implemented");
    const target = task._id;
    await deleteTask(target);
    onDelete(target);
  };

  return (
    <div className={`task-item ${task.status ? "completed" : ""}`}>
      <p className="Date">
        {task.Date ? new Date(task.Date).toLocaleDateString() : "not set"}
      </p>
      <h3>{task.Heading}</h3>
      <p>{task.Discription}</p>
      <div className="Button-Pack">
        <button
          onClick={handleComplete}
          className={task.status ? "completed-button" : ""}
        >
          {task.status ? "Undo" : "Mark Complete"}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
