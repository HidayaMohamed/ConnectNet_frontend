##ConnectNet_Frontend

A simple  application featuring user authentication, persistent login via backend, routing with React Router, and a shared global user state.

##Features

User Authentication
Login, register, and profile pages.

Persistent User State
User data is stored in localStorage and restored on page refresh.

Protected UI
Navbar and pages react dynamically to login state.

React Router v6
SPA routing with <Routes> and <Route>.

Clean Component Structure
Clear separation of components (Navbar) and pages (Home, Login, Register, Profile).

## Project Structure
src/
│
├── components/
│   └── Navbar.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Profile.jsx
│
├── App.jsx
└── index.js

## How It Works
User State Management

App maintains a user object:

const [user, setUser] = useState(null);

Persistent Login

On load, it restores the user from localStorage:

useEffect(() => {
  const raw = localStorage.getItem("user");
  if (raw) setUser(JSON.parse(raw));
}, []);


On change, it saves or clears the user:

useEffect(() => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}, [user]);

 Routing

Pages are defined using React Router:

<Routes>
  <Route path="/" element={<Home user={user} />} />
  <Route path="/login" element={<Login setUser={setUser} />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile/:id" element={<Profile user={user} />} />
</Routes>

## Installation & Setup
1. Clone the repo
git clone https://github.com/HidayaMohamed/ConnectNet_frontend
cd your-repo

2. Install dependencies
npm install

3. Start the development server
npm run dev


Your app should now be running at:

http://localhost:3000/

## Components Overview
Navbar

Displays login/register buttons or user info.

Allows logout by calling setUser(null).

Home

Landing page, optionally personalized if a user is logged in.

Login

Accepts credentials and calls setUser on success.

Register

New user registration form.

Profile

Displays info based on :id route parameter.

## Technologies Used

React 

React Router v6

TailwindCSS 

localStorage API

## Support and contact details
GitHub - github.com/HidayaMohamed email - hidayamohaed002@gmail.com

## License

The content of this site is licensed under the MIT license Copyright (c) 2025.