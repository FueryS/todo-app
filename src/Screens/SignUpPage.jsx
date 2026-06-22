import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { signUp } from "../Services/LoginService";
import { AppButton } from "../components/common/AppButton";
import "./Global.css";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event) {
    event.preventDefault();

    if (!user.trim() || !pass.trim()) {
      toast.error("Username and password are required.");
      return;
    }

    setLoading(true);
    const response = await signUp(user, pass);
    setLoading(false);

    if (!response.success) {
      toast.error(response.message || "Signup failed.");
      return;
    }

    toast.success("Account created. Please login.");
    navigate("/login", { replace: true });
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSignUp}>
        <h1 className="login-title">Sign Up</h1>

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
          {loading ? "Creating..." : "Create Account"}
        </AppButton>

        <button
          type="button"
          className="auth-link-button"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </button>
      </form>
    </main>
  );
}
