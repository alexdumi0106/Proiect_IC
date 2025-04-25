// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'; // Create this for styling

const HomePage = () => {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    axios.get('/api/courts')
      .then(res => setCourts(res.data))
      .catch(err => console.error('Error fetching courts:', err));
  }, []);

  return (
    <div className="homepage">
      <h1>TennisTime</h1>
      <p>All your favourite courts in the same place</p>
      <div className="court-list">
        {courts.map(court => (
          <div className="court-card" key={court.id}>
            <img src={court.image_url} alt="map" className="court-img"/>
            <div className="court-info">
              <h2>📍 {court.name}</h2>
              <p>{court.location}</p>
            </div>
            <button className="details-btn" onClick={() => window.location.href=`/courts/${court.id}`}>
              View details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
