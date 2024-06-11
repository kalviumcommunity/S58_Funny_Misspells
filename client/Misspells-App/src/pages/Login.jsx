import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:1330/login', {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res.token); // Assuming your backend responds with a token
      // Handle response as needed, e.g., store user email in a cookie
      document.cookie = `userEmail=${email}; path=/`;
      // Optionally redirect to another page or update state to reflect successful login
    }).catch((err) => {
      console.log(err);
      // Handle error, e.g., show error message to the user
    });
    
    // Clear the form fields after submission (optional)
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <h2>LOGIN FORM</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email} // Bind the value to the state
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password} // Bind the value to the state
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
