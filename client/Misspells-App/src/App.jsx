import { useState, useEffect } from 'react';
import Navbar from './navbar'; // Import the Navbar component
import './App.css';
import MispellComponent from './components/MispellComponent';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://s58-funny-misspells-public.onrender.com/routes');
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

  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
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
