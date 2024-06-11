import React, { useState } from 'react';
import './RegistrationForm.css'; // Import the CSS file

function RegistrationForm() {
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
    // console.log('Email:', email);
    // console.log('Password:', password);
    fetch('http://localhost:1330/signup', {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e)
    });
    // Reset the form after submission
    setEmail('');
    setPassword('');
  };

  return (
    <div className="registration-form-container">
      <h2 className="registration-form-title">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="registration-form-group">
          <label className="registration-form-label" htmlFor="email">Email:</label>
          <input
            className="registration-form-input"
            type="email"
            id="email"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="registration-form-group">
          <label className="registration-form-label" htmlFor="password">Password:</label>
          <input
            className="registration-form-input"
            type="password"
            id="password"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="registration-form-submit" type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
