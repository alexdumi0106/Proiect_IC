
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourtPage.css';

function CourtPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [court, setCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch court details and reservations
    axios.get(`/api/courts/${id}`)
      .then(res => {
        setCourt(res.data.court);
        setReservations(res.data.reservations);
      })
      .catch(err => console.error('Error fetching court:', err));
  }, [id]);

  if (!court) return <div>Loading...</div>;

  const handleCreateReservation = async () => {
    try {
      const startTime = new Date(selectedDate);
      const [hour] = selectedHour.split(':');
      startTime.setHours(parseInt(hour));
      startTime.setMinutes(0);
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);

      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1); // assuming 1-hour slot

      await axios.post('/api/reservations', {
        court_id: id,
        user_name: formData.name,
        user_email: formData.email,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString()
      });

      alert('Reservation created successfully!');
      window.location.reload(); // Refresh page to show updated slots

    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation.');
    }
  };

  return (
    <div className="court-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      {/* Court and Complex Name */}
      <h1>{court.name}</h1>
      <h2>📍{court.complex_name}</h2>

      <div className="court-info-card">
        <div className="court-map">
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

        <div className="court-photo">
          <img src={court.image_url || "default.jpg"} alt="Court" />
        </div>
      </div>


      {/* Calendar Section */}
      <div className="calendar-section">
        <h3>Select a Day</h3>
        <div className="day-selector">
          {generateNextDays(7).map(day => (
            <button
              key={day.toDateString()}
              className={`day-button ${day.toDateString() === selectedDate.toDateString() ? 'active' : ''}`}
              onClick={() => {
                setSelectedDate(day);
                setSelectedHour(null); // Reset selected hour when changing day
              }}
            >
              {day.toDateString().slice(0, 10)}
            </button>
          ))}
        </div>

        {/* Available/Booked Hours */}
        <div className="hours-section">
          <h4>Available Hours</h4>
          <div className="hours-grid">
            {generateHourSlots().map((slot) => {
              const isBooked = reservations.some(reservation =>
                isTimeConflict(slot, reservation, selectedDate)
              );

              return (
                <div
                  key={slot}
                  className={`hour-slot ${isBooked ? 'booked' : 'available'}`}
                  onClick={() => {
                    if (!isBooked) setSelectedHour(slot);
                  }}
                >
                  {slot}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reservation Form */}
        {selectedHour && (
          <div className="reservation-form">
            <h4>Book for {selectedHour} on {selectedDate.toDateString().slice(0, 10)}</h4>

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

            <button className="create-btn" onClick={handleCreateReservation}>
              Create Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper: next 7 days
function generateNextDays(n) {
  const days = [];
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push(date);
  }
  return days;
}

// Helper: available hours (8AM to 8PM)
function generateHourSlots() {
  const hours = [];
  for (let h = 8; h < 20; h++) {
    hours.push(`${h}:00`);
  }
  return hours;
}

// Helper: check conflict with existing reservations
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

