import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    const u = (username || "").trim();
    const e = (email || "").trim();
    const p = (password || "").trim();

    if (!u || !e || !p) {
      setError("Username, email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const userData = {
        username: u,
        email: e,
        password: p,
        name: (name || "").trim(),
      };
      await register(userData);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.error ||
          err?.message ||
          "Registration failed. Please check your details."
      );
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        required
        disabled={loading}
        aria-label="username"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleRegister();
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        required
        disabled={loading}
        aria-label="email"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleRegister();
        }}
      />
      <input
        type="text"
        placeholder="Name (Optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        disabled={loading}
        aria-label="name"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        required
        disabled={loading}
        aria-label="password"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleRegister();
        }}
      />
      <button
        onClick={handleRegister}
        className="w-full bg-sky-500 text-white py-2 rounded disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};
export default Register;