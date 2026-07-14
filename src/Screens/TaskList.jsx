import { useEffect, useState } from "react";
import { Fragment } from "react";

import { deleteTask, fetchAllTask, updateTask } from "../Services/taskService";
import ListItem from "../components/common/ListItem";

/**
 *
 * @param {any} triggerReload changing this value to anything will trigger a reload
 * @returns A task list containing all the task assigned to this account
 */
function TaskList({ triggerReload }) {
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState();

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllTask();
      // console.log(result);
      setTasks(result.value);
    };
    loadData();
  }, [triggerReload]);

  const defineVarient = (task) => {
    if (task.status) return "completed";

    if (task.Date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDate = new Date(task.Date);
      taskDate.setHours(0, 0, 0, 0);
      if (today > taskDate) return "failed";
    }

    return "pending";
  };

  const onToggle = async (id, newStatus) => {
    const status = await updateTask(id, newStatus);
    if (!status.success) return;
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t)),
    );
    console.log("updated:", id, newStatus);
  };
  const onDelete = async (id) => {
    const status = await deleteTask(id);
    if (!status.success) return;
    setTasks((prev) => prev.filter((t) => t._id !== id));
    console.log("delete");
  };

  return (
    <div
      className="task-page-shell"
      onClick={() => {
        setActive(undefined);
      }}
    >
      {tasks.map((task, _) => (
        <ListItem
          key={task._id}
          title={task.Heading}
          body={task.Discription}
          date={task.Date?.split("T")[0]}
          eventFun={() => {
            if (defineVarient(task) === "failed") {
              onDelete(task._id);
            } else {
              onToggle(task._id, !task.status);
            }
          }}
          deleteFun={() => {
            onDelete(task._id);
          }}
          onPress={() => {
            setActive(task._id);
            // console.log(active);
          }}
          active={false || active == task._id}
          varient={defineVarient(task)}
        />
      ))}
    </div>
  );
}

export default TaskList;
