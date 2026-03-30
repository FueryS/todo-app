import "./components.css";
import { updateTask, deleteTask } from "../taskService";

function TaskItem({ task, onToggle, onDelete }) {
  const handleComplete = async () => {
    // console.warn("handleComplete has not yet been implemented");
    const target = task.id;
    const value = !task.completed;

    await updateTask(target, value);

    onToggle(target, value);
    console.log(task.completed);
  };

  const handleDelete = async () => {
    // console.warn("handleDelete has not yet been implemented");
    const target = task.id;
    await deleteTask(target);
    onDelete(target);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <p>
        {task.duedate
          ? new Date(task.duedate.iso).toLocaleDateString()
          : "not set"}
      </p>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button
        onClick={handleComplete}
        className={task.completed ? "completed-button" : ""}
      >
        {task.completed ? "Undo" : "Mark Complete"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
