import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CookieTesting from "./components/CookieTesting";

import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <div className="app">
        <h1>Todo App </h1>
        <TaskForm />
        <hr />
        <TaskList />
      </div>
    </CookiesProvider>
  );
}

export default App;
