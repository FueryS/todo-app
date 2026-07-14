import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import "./Theme/theme.css";
import { Toaster } from "react-hot-toast";

import Pin from "./components/Icons/Pin.png";

import { AppButton } from "./components/common/AppButton";
import TaskList from "./Screens/TaskList";
import TaskForm from "./Screens/TaskForm";
import LoginPage from "./Screens/LoginPage";
import SignUpPage from "./Screens/SignUpPage";

import { getSession, deleteSessionCookie } from "./Services/cookieService";

function ProtectedRoute({ children }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }) {
  const session = getSession();

  if (session) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function HomePage() {
  const navigate = useNavigate();

  const [triggerReload, setTriggerReload] = useState(false);
  const [visibleTaskForm, setVisibleTaskForm] = useState(false);
  const userName = localStorage.getItem("userName") || "Guest";

  function handleLogout() {
    deleteSessionCookie();
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-brand">
          <img src="/image.png" className="brand-logo-img" alt="Logo" />
          <h1 className="brand-title">Goal-Window</h1>
        </div>
        <div className="header-user-actions">
          <span className="user-welcome">Welcome, <strong>{userName}</strong></span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <TaskList triggerReload={triggerReload} />
      </main>

      <TaskForm
        visible={visibleTaskForm}
        hide={() => {
          setVisibleTaskForm(false);
          setTriggerReload((prev) => !prev);
        }}
      />

      <button className="add-task-fab" onClick={() => setVisibleTaskForm(true)}>
        <span className="fab-plus">+</span>
        <span className="fab-text">Add Task</span>
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignUpPage />
            </PublicOnlyRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
