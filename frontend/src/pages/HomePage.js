import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourtCard from '../components/CourtCard';
import './HomePage.css';

function HomePage() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    axios.get('/api/courts')
      .then(res => setCourts(res.data))
      .catch(err => console.error('Error fetching courts:', err));
  }, []);

  return (
    <div className="homepage">
      {/* Header Section */}
      <div className="homepage-header">
        <h1 className="homepage-title">TennisTime</h1>
        <p className="homepage-subtitle">All your favourite courts in one place</p>
      </div>

      {/* Courts List */}
      <div className="court-list">
        {courts.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
