import React from "react";
import { Link } from "react-router-dom";

// Navbar component to display site navigation
const Navbar = ({ user }) => {
  return (
    <nav className="bg-sky-500 p-4 text-white flex justify-between items-center">
      {/* Site logo */}
      <Link to="/" className="font-bold text-lg">
        ConnectNet
      </Link>

      {/* Navigation links */}
      <div className="space-x-4">
        {user ? (
          <>
            {/* Show username and profile link if logged in */}
            <span>{user.username}</span>
            <Link to={`/profile/${user.id}`} className="hover:underline">
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
