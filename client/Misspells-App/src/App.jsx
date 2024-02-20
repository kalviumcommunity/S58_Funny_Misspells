import { useState, useEffect } from 'react';
import Navbar from './navbar'; // Import the Navbar component
import './App.css';

const MyComponent = () => {
  const [data, setData] = useState([]);

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

  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <ul>
        {data?.map((item, index) => (
          <li key={index}>
            <div>No. {item.ID}</div>
            <img src={item.URL} alt={item.alt} />
            <div className="caption">{item.Caption}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
