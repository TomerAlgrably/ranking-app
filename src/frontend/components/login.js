import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = async (e) => {
    
    e.preventDefault();

    try {
      setErrorMessage('');
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      console.log({response})

      // Assuming the server sends a token upon successful login
      const token = response?.data.token;

      // Save the token in localStorage or as a cookie for future requests
      localStorage.setItem('token', token);

      // Notify the parent component about the successful login
      onLogin();
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      if (error.response.data.message === 'Invalid username or password') {
        setErrorMessage('Invalid username or password');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
