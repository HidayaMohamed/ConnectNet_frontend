import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    try {
      // Must include all required fields for the backend schema
      const userData = { username, email, password, name };

      await register(userData);

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      // Handle backend errors (e.g., username/email conflict)
      setError(
        err.response?.data?.detail ||
          "Registration failed. Please check your details."
      );
      console.error("Registration failed:", err);
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
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Name (Optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        required
      />
      <button
        onClick={handleRegister}
        className="w-full bg-sky-500 text-white py-2 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
