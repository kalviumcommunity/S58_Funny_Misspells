import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar'; // Import the Navbar component
import './App.css';
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Form1 } from './pages/Form1';
import { Form2 } from './pages/Form2';
import { Form3 } from './pages/Form3';
import RegistrationForm from './pages/RegistrationForm';
import Login from './pages/Login';
import Logout from './pages/Logout';


const MyComponent = () => {

  

  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Form1" element={<Form1 />} />
        <Route path="/Form2" element={<Form2 />} />
        <Route path="/Form3" element={<Form3 />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default MyComponent;
