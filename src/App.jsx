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

import { getSession, deleteSessionCookie } from "./Services/CookieService";

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

  function handleLogout() {
    deleteSessionCookie();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <AppButton varient="elevated-drop" onClick={handleLogout}>
        Logout
      </AppButton>

      <TaskForm
        visible={visibleTaskForm}
        hide={() => {
          setVisibleTaskForm(false);
          setTriggerReload((prev) => !prev);
        }}
      />

      <AppButton varient="icon-add" onClick={() => setVisibleTaskForm(true)}>
        Add Item <img src={Pin} alt="pin icon" />
      </AppButton>

      <TaskList triggerReload={triggerReload} />
    </>
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
