import React, { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      const userData = await login(username, password);
      setUser(userData);
      navigate("/"); // redirect to home
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-sky-500 text-white py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
