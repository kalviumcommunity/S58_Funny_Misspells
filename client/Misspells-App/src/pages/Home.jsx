import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom';
import MispellComponent from '../components/MispellComponent';
import RegistrationForm from './RegistrationForm';

const Home = () => {

    const [data, setData] = useState([]);
    const [form,setForm] = useState(false);
    const navigate=useNavigate();
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
        navigate ("/Form1")
      // window.location.href = '/components/Form'; // Redirect to the form route when the button is clicked
    };
    const redirectToForm2 = () => {
    navigate ("/Form2")
  }

  const redirectToForm3 = () => {
    navigate ("/Form3")
  }

  const handelRegistration= () => {
    navigate ("/RegistrationForm")
  }
  
  
  
    if (form === true){
      return <Form></Form>
    }
    
  return (
    <div>
        <button className="submit-btn" onClick={redirectToForm}>Give your own submission</button> {/* Use a button to navigate to the form route */}
      <button onClick={redirectToForm2}>Update ane Entity</button> 
      <button onClick={redirectToForm3}>Delete an Entity</button> 
      <button onClick={handelRegistration}>Regsiter</button>

      <ul>
        {data?.map((item, index) => (
          <li key={index}>
            <MispellComponent item={item}></MispellComponent>
          </li>
        ))}
      </ul>
    </div>
    // </div>
  )
}

export default Home