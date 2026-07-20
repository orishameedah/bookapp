import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";

function AuthPage({ type, onSuccess, navigateTo, setMessage }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const isLogin = type === "login";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const payload = isLogin
      ? { email: form.email, password: form.password }
      : { username: form.username, email: form.email, password: form.password };

    const result = isLogin
      ? await loginUser(payload)
      : await registerUser(payload);

    if (result.token) {
      onSuccess(result.user, result.token);
      navigate(navigateTo);
      return;
    }

    setError(result.message || "Something went wrong");
  };

  return (
    <section className="auth-card">
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <label>
            Username
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
          </label>
        )}
        <label>
          {isLogin ? "Email or Username" : "Email"}
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter a password"
          />
        </label>
        <button type="submit" className="button">
          {isLogin ? "Login" : "Create account"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}

export default AuthPage;
