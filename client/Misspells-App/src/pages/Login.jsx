import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform any further actions like submitting the data to a server
    // For now, let's assume successful login
    // Display an alert
    alert('Logged in successfully');
    // Redirect to the home page
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label className="login-form-label" htmlFor="email">Email:</label>
          <input
            className="login-form-input"
            type="email"
            id="email"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="login-form-group">
          <label className="login-form-label" htmlFor="password">Password:</label>
          <input
            className="login-form-input"
            type="password"
            id="password"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="login-form-submit" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
