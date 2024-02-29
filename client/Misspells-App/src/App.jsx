import React, { useState, useEffect } from 'react';
import Navbar from './navbar'; // Import the Navbar component
import './App.css';
import MispellComponent from './components/MispellComponent';
import Form from './components/Form';
import {Routes,Route}  from "react-router-dom";
import Home from './pages/Home';
import { Form1 } from './pages/Form1';
import { Form2 } from './pages/Form2';
import { Form3 } from './pages/Form3';
const MyComponent = () => {


  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <Routes>
       <Route path="/" element={<Home/>}></Route>
       <Route path="/Form1" element={<Form1/>}></Route>
       <Route path="/Form2" element={<Form2/>}></Route>
       <Route path="/Form3" element={<Form3/>}></Route>
      </Routes>
    </>
  );
};

export default MyComponent;
