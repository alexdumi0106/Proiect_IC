import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CourtCard from '../components/CourtCard';
import './HomePage.css';

function getAvailableSlotsToday(reservations) {
  const today = new Date();
  const now = new Date();
  const available = [];

  for (let h = 7; h < 24; h++) {
    const slotStart = new Date(today);
    const slotEnd = new Date(today);
    slotStart.setHours(h, 0, 0, 0);
    slotEnd.setHours(h + 1, 0, 0, 0);

    // Replicating isSlotPast logic from CourtPage.js
    const isPast = today.toDateString() === now.toDateString() && slotStart <= now;
    if (isPast) continue;

    const isBooked = reservations.some(r => {
      const rStart = new Date(r.start_time);
      const rEnd = new Date(r.end_time);
      return slotStart < rEnd && slotEnd > rStart;
    });

    if (!isBooked) {
      available.push(h);
    }
  }

  return available.length;
}

async function fetchCourtWithAvailability(court) {
  try {
    const res = await axios.get(`/api/courts/${court.id}`);
    const reservations = res.data.reservations || [];
    const availableSlots = getAvailableSlotsToday(reservations);

    return {
      ...court,
      availableSlots
    };
  } catch (err) {
    console.error(`Error fetching court ${court.id}`, err);
    return { ...court, availableSlots: 0 }; // fallback
  }
}


function HomePage() {
  const [courts, setCourts] = useState([]);
  const courtListRef = useRef(null); 
  // For the search bar
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  async function fetchAllCourts() {
    try {
      const res = await axios.get('/api/courts');
      const courtsRaw = res.data;

      const courtsEnriched = await Promise.all(
        courtsRaw.map(court => fetchCourtWithAvailability(court))
      );

      setCourts(courtsEnriched);
      } catch (err) {
      console.error('Error fetching courts:', err);
      }
    }
    fetchAllCourts();
  }, []);

  const handleScrollToCourts = () => {
    courtListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (court.complex_name && court.complex_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

      {/* Wave Divider
      <div className="wave-divider">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path d="M0,0 C480,150 960,0 1440,150 L1440,00 L0,0 Z" fill="#f7f7f7"></path>
        </svg>
      </div> */}

      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search courts by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>

      {/* Courts List */}
      <div className="court-list" ref={courtListRef}>
        {
          filteredCourts.length === 0 ? (
            <div className="no-courts-found">
              No courts found.
            </div>
          ) : (
            filteredCourts.map(court => (
              <CourtCard key={court.id} court={court} availableSlots={court.availableSlots}/>
            ))
          )
        }
      </div>
    </div>
  );
}

export default HomePage;
