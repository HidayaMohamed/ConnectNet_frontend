import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Added Register
import Profile from "./pages/Profile";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} /> {/* Pass setUser for logout */}
      <div className="min-h-screen bg-gray-100 pb-10">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
