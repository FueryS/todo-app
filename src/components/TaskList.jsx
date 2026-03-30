import { useEffect, useState } from "react";
import { Fragment } from "react";

import { fetchAllTask } from "../taskService";
import TaskItem from "./TaskItem";
import "./components.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllTask();
      setTasks(result);
    };
    loadData();
  }, []);

  const onToggle = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newStatus } : t)),
    );
  };
  const onDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          key={task.id}
        />
      ))}
    </>
  );
}

export default TaskList;
