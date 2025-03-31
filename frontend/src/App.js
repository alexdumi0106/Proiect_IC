import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    // Fetch courts from the backend, for now like this
    axios.get('http://localhost:5000/courts')
      .then(response => {
        setCourts(response.data);  // Store the fetched courts data in state
      })
      .catch(error => {
        console.error('Error fetching courts:', error);
      });
  }, []);

  return (
    <div>
      <h1>Tennis Courts</h1>
      <ul>
        {courts.map(court => (
          <li key={court.id}>{court.name} - {court.location}</li>
        ))}
      </ul>
    </div>
  );
};


export default App;
