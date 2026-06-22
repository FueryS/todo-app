import { useState } from "react";
import { signUp } from "../Services/LoginService";
import {
  setSession,
  deleteSessionCookie,
  getSession,
} from "../Services/CookieService";

export default function SignUpTesting() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [result, setResult] = useState(null);
  const [currentSession, setCurrentSession] = useState(getSession());

  function refreshSessionDisplay() {
    setCurrentSession(getSession());
  }

  async function handleSignUp() {
    const response = await signUp(user, pass);

    refreshSessionDisplay();

    setResult({
      ...response,
      jwt: getSession(),
    });
  }

  async function handleLogin() {
    const success = await setSession(user, pass);

    refreshSessionDisplay();

    setResult({
      success,
      message: success
        ? "Session cookie successfully created."
        : "Login failed.",
      jwt: getSession(),
      error: success ? null : "Login Error",
    });
  }

  function handleLogout() {
    const success = deleteSessionCookie();

    refreshSessionDisplay();

    setResult({
      success,
      message: success
        ? "Session cookie deleted."
        : "Failed to delete session cookie.",
      jwt: getSession(),
      error: success ? null : "Cookie Delete Error",
    });
  }

  return (
    <div>
      <h1>Sign Up Testing</h1>

      <p>
        <strong>Current Session Cookie:</strong>{" "}
        {currentSession ?? "No Session Found"}
      </p>

      <div>
        <label>Username</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>

      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>

      {result && (
        <div>
          <h3>Result</h3>

          <p>
            <strong>Success:</strong> {String(result.success)}
          </p>

          <p>
            <strong>Message:</strong> {result.message}
          </p>

          <p>
            <strong>Session Cookie:</strong> {result.jwt ?? "No Session Found"}
          </p>

          <p>
            <strong>Error:</strong> {result.error ?? "None"}
          </p>
        </div>
      )}
    </div>
  );
}
