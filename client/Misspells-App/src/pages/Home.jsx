import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MispellComponent from '../components/MispellComponent';
import axios from 'axios';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(false);
  const navigate = useNavigate();

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
    navigate("/Form1");
  };

  const redirectToForm2 = () => {
    navigate("/Form2");
  };

  const redirectToForm3 = () => {
    navigate("/Form3");
  };

  const handleRegistration = () => {
    navigate("/RegistrationForm");
  };

  const redirectToLogin = () => {
    navigate("/login"); // Redirect to the login route
  };

  const redirectToLogout = () => {
    navigate("/logout"); // Redirect to the logout route
  };

  if (form === true) {
    return <Form></Form>;
  }

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    axios.get(`http://localhost:1330/routes/created_by?created_by=${event.target.value}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <div className="button-container">
        <button className="submit-btn" onClick={redirectToForm}>Give your own submission</button>
        <button onClick={redirectToForm2}>Update an Entity</button>
        <button onClick={redirectToForm3}>Delete an Entity</button>
        <button onClick={handleRegistration}>Register</button>
        <button onClick={redirectToLogin}>Login</button>
        <button onClick={redirectToLogout}>Logout</button>
      </div>

      <select className="form-select" value={selectedOption} onChange={handleChange}>
        <option value="Aiman">Aiman</option>
        <option value="Aayush">Aayush</option>
        <option value="Nimish">Nimish</option>
      </select>

      <div className="data-container">
        <ul>
          {data?.map((item, index) => (
            <li key={index} className="mispell-item">
              <MispellComponent item={item}></MispellComponent>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
