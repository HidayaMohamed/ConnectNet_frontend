import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">ConnectNet</h1>
      <div>
        <button className="mr-4">Home</button>
        <button>Profile</button>
      </div>
    </nav>
  );
}
