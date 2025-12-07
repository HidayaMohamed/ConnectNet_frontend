import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser = () => {} }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-sky-500 p-4 text-white flex justify-between items-center shadow-md">
      <h2 className="font-bold text-xl">ConnectNet</h2>
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <span className="font-medium">Welcome, {user.username}</span>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to={`/profile/${user.id}`} className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-sky-700 px-3 py-1 rounded hover:bg-sky-800"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;