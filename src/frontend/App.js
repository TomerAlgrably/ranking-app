// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Login from './components/login';
import Dashboard from './components/dashboard';

const Home = () => <h1>Welcome, User!</h1>;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   const verifyToken = async () => {
     const token = localStorage.getItem('token');
     if (token) {
       try {
         // Make a request to the server to verify the token
         const response = await axios.post('http://localhost:3000/verify', { token });
         
         // If the server responds with user information, set the user as authenticated
         setIsLoggedIn(response.data.user);
       } catch (error) {
         // Handle errors, e.g., invalid token or server error
         console.error('Token verification failed:', error.message);
         setIsLoggedIn(false);
       }
     }
   };
 
   verifyToken();
 }, []);
 
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <div>
                  <Dashboard />
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <div>
                  <Home />
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
