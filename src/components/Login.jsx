import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'staff@clinic.com' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');  
      history.replace('/calendar');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Clinic Staff Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
