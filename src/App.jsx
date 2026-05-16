import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TestingCustomBackend from "./components/TestingCustomBackend";

function App() {
  return (
    <div className="app">
      <h1>Todo App</h1>
      <TaskForm />
      <hr />
      <TaskList />
    </div>
  );
}

export default App;
