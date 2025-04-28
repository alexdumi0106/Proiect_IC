
import React, { useEffect, useState } from 'react';
import { useRef } from 'react'; // add to your imports
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourtPage.css';

function CourtPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [court, setCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [startSlot, setStartSlot] = useState(null);
  const [endSlot, setEndSlot] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const formRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/courts/${id}`)
      .then(res => {
        setCourt(res.data.court);
        setReservations(res.data.reservations);
      })
      .catch(err => console.error('Error fetching court:', err));
  }, [id]);

  useEffect(() => {
    if (startSlot && endSlot && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [startSlot, endSlot]);


  if (!court) return <div>Loading...</div>;

  const handleHourClick = (slot) => {
    // To deselect after clicking again the start hour
    if (slot === startSlot && !endSlot) {
      setStartSlot(null);
      setEndSlot(null);
      return;
    }
  
    if (!startSlot) {
      setStartSlot(slot);
      setEndSlot(null);
    } else if (!endSlot) {
      if (slot > startSlot) {
        setEndSlot(slot);
      } else {
        setStartSlot(slot);
        setEndSlot(null);
      }
    } else {
      setStartSlot(slot);
      setEndSlot(null);
    }
  };
  
  const handleCreateReservation = async () => {
    if (!startSlot || !endSlot) {
      alert('Please select a valid start and end hour.');
      return;
    }

    if (!isValidReservation()) {
      alert('Reservation time conflicts with an existing booking.');
      return;
    }

    try {
      const startTime = new Date(selectedDate);
      const startHour = parseInt(startSlot.split(':')[0]);
      const startMinute = parseInt(startSlot.split(':')[1]);
      startTime.setHours(startHour);
      startTime.setMinutes(startMinute);

      const endTime = new Date(selectedDate);
      const endHour = parseInt(endSlot.split(':')[0]);
      const endMinute = parseInt(endSlot.split(':')[1]);
      endTime.setHours(endHour);
      endTime.setMinutes(endMinute);

      await axios.post('/api/reservations', {
        court_id: id,
        user_name: formData.name,
        user_email: formData.email,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString()
      });

      alert('Reservation created successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation.');
    }
  };

  const isValidReservation = () => {
    const allSlots = generateHourSlots();
    const startIdx = allSlots.indexOf(startSlot);
    const endIdx = allSlots.indexOf(endSlot);

    for (let i = startIdx; i < endIdx; i++) {
      if (reservations.some(reservation =>
        isTimeConflict(allSlots[i], reservation, selectedDate)
      )) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="courtpage-wrapper">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="court-hero">
        <h1 className="court-name">{court.name}</h1>
        <p className="complex-name">📍 {court.complex_name}</p>
      </div>

      <div className="info-card">
        <div className="map-section">
          <iframe
            title="map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${encodeURIComponent(court.location)}&output=embed`}
            allowFullScreen
          />
        </div>
        <div className="photo-section">
          <img src={court.image_url || "default.jpg"} alt="Court" />
        </div>
      </div>

      <div className="calendar-card">
        <h2>Select a Day</h2>
        <div className="day-selector">
          {generateNextDays(7).map(day => (
            <button
              key={day.toDateString()}
              className={`day-button ${day.toDateString() === selectedDate.toDateString() ? 'active' : ''}`}
              onClick={() => {
                setSelectedDate(day);
                setStartSlot(null);
                setEndSlot(null);
              }}
            >
              {day.toDateString().slice(0, 10)}
            </button>
          ))}
        </div>

        <h3>Select Time Range</h3>
        <div className="hours-grid">
          {generateHourSlots().map((slot) => {
            const isBooked = reservations.some(reservation =>
              isTimeConflict(slot, reservation, selectedDate)
            );

            const isInSelectedRange = startSlot && endSlot && (slot >= startSlot && slot < endSlot);
            const isStart = startSlot === slot;
            const isEnd = endSlot === slot;

            return (
              <div
                key={slot}
                className={`hour-slot 
                  ${isBooked ? 'booked' : ''}
                  ${isInSelectedRange ? 'selected' : ''}
                  ${isStart ? 'start-slot' : ''}
                  ${isEnd ? 'end-slot' : ''}`}
                onClick={() => {
                  if (!isBooked) handleHourClick(slot);
                }}
              >
                {slot}
              </div>
            );
          })}
        </div>
      </div>

      {startSlot && endSlot && (
        <div className="reservation-card" ref={formRef}>
          <h2>Confirm Reservation</h2>
          <p className="selected-time">
            {startSlot} → {endSlot}
          </p>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <button className="reserve-button" onClick={handleCreateReservation}>
            Confirm Reservation
          </button>
        </div>
      )}
    </div>
  );
}

// Helpers
function generateNextDays(n) {
  const days = [];
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push(date);
  }
  return days;
}

function generateHourSlots() {
  const hours = [];
  for (let h = 7; h <= 23; h++) {
    hours.push(`${h}:00`);
  }
  return hours;
}

function isTimeConflict(slot, reservation, selectedDate) {
  const slotHour = parseInt(slot.split(':')[0]);
  const resStart = new Date(reservation.start_time);
  const resEnd = new Date(reservation.end_time);
  return (
    resStart.getDate() === selectedDate.getDate() &&
    resStart.getMonth() === selectedDate.getMonth() &&
    resStart.getFullYear() === selectedDate.getFullYear() &&
    resStart.getHours() <= slotHour &&
    resEnd.getHours() > slotHour
  );
}

export default CourtPage;

