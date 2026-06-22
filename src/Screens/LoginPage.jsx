import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { setSession } from "../Services/CookieService";
import { AppButton } from "../components/common/AppButton";
import "./Global.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    if (!user.trim() || !pass.trim()) {
      toast.error("Username and password are required.");
      return;
    }

    setLoading(true);
    const response = await setSession(user, pass);
    setLoading(false);

    if (!response.success) {
      toast.error(response.message || "Login failed.");
      return;
    }

    toast.success("Login successful.");
    navigate("/", { replace: true });
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1 className="login-title">Login</h1>

        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <AppButton varient="button-pending">
          {loading ? "Logging in..." : "Login"}
        </AppButton>

        <button
          type="button"
          className="auth-link-button"
          onClick={() => navigate("/signup")}
        >
          New user? Create account
        </button>
      </form>
    </main>
  );
}
