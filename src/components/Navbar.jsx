import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        ConnectNet
      </Link>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/profile/1">Profile</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
