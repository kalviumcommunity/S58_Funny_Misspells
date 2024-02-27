import React, { useState, useEffect } from 'react';
import Navbar from './navbar'; // Import the Navbar component
import './App.css';
import MispellComponent from './components/MispellComponent';
import Form from './components/Form';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [form,setForm] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://s58-funnymisspells.onrender.com/routes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const redirectToForm = () => {
    setForm(true)
    // window.location.href = '/components/Form'; // Redirect to the form route when the button is clicked
  };
  if (form === true){
    return <Form></Form>
  }

  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <button className="submit-btn" onClick={redirectToForm}>Give your own submission</button> {/* Use a button to navigate to the form route */}
      <ul>
        {data?.map((item, index) => (
          <li key={index}>
            <MispellComponent item={item}></MispellComponent>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
