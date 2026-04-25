import React, { useState } from 'react';
import '.././Login.css';
import { API_BASE_URL } from '../API/api';

const Login = ({ setIsLoggedIn }) => {
  const [UserEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/V1/auth/registorUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: UserEmail, // only mapping, variable unchanged
          password
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      console.log("TOKEN:", data.token); // debug

      localStorage.setItem('token', data.token);

      setIsLoggedIn(true);

    } catch (err) {
      console.log('Login error', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>

        <input
          type="text"
          placeholder="Enter Email"
          value={UserEmail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;