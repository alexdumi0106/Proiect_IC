import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CourtCard from '../components/CourtCard';
import './HomePage.css';

function HomePage() {
  const [courts, setCourts] = useState([]);
  const courtListRef = useRef(null); 

  useEffect(() => {
    axios.get('/api/courts')
      .then(res => setCourts(res.data))
      .catch(err => console.error('Error fetching courts:', err));
  }, []);

  const handleScrollToCourts = () => {
    courtListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="homepage-title">TennisTime</h1>
        <p className="homepage-subtitle">All your favourite courts in one place</p>
        <button className="cta-button" onClick={handleScrollToCourts}>
          Reserve a Court
        </button>
      </div>

      {/* Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path d="M0,0 C480,150 960,0 1440,150 L1440,00 L0,0 Z" fill="#f7f7f7"></path>
        </svg>
      </div>

      {/* Courts List */}
      <div className="court-list" ref={courtListRef}>
        {courts.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
