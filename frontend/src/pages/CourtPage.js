import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourtPage.css';

function CourtPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [court, setCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  // In case of already upcoming reservation
  const [errorMsg, setErrorMsg] = useState('');
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
    if (selectedSlots.length > 0 && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSlots]);

  if (!court) return <div>Loading...</div>;

  const isSlotBooked = (slotLabel) => {
    const hour = parseInt(slotLabel.split(':')[0]);
    const slotStart = new Date(selectedDate);
    slotStart.setHours(hour, 0, 0, 0);
    const slotEnd = new Date(selectedDate);
    slotEnd.setHours(hour + 1, 0, 0, 0);

    return reservations.some(reservation => {
      const resStart = new Date(reservation.start_time);
      const resEnd = new Date(reservation.end_time);
      return slotStart < resEnd && slotEnd > resStart;
    });
  };

  const isSlotPast = (slotLabel) => {
    const hour = parseInt(slotLabel.split(':')[0]);
    const now = new Date();
    const slotTime = new Date(selectedDate);
    slotTime.setHours(hour, 0, 0, 0);
    return selectedDate.toDateString() === now.toDateString() && slotTime <= now;
  };

  const handleSlotClick = (slotKey) => {
    const hour = parseInt(slotKey);
    const label = `${slotKey} - ${hour + 1}:00`;

    if (isSlotBooked(label) || isSlotPast(label)) return;

    const newSelected = [...selectedSlots];

    if (newSelected.includes(slotKey)) {
      setSelectedSlots(newSelected.filter(s => s !== slotKey));
      return;
    }

    newSelected.push(slotKey);

    // Sort correctly by hour value
    const sorted = newSelected.sort((a, b) => parseInt(a) - parseInt(b));
    const hourNums = sorted.map(s => parseInt(s));
    const isContinuous = hourNums.every((h, i, arr) => i === 0 || h === arr[i - 1] + 1);

    if (isContinuous) {
      setSelectedSlots(sorted);
    } else {
      alert("Please select only continuous time slots.");
    }
  };

  function isValidEmail(email) {
    // Basic email pattern, works for most valid emails
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleCreateReservation = async () => {
    setErrorMsg(''); // Clear previous error
    if (selectedSlots.length === 0) {
      alert('Please select at least one time slot.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const startSlot = selectedSlots[0];
    const endSlot = selectedSlots[selectedSlots.length - 1];

    const startTime = new Date(selectedDate);
    const endTime = new Date(selectedDate);
    startTime.setHours(parseInt(startSlot), 0, 0, 0);
    endTime.setHours(parseInt(endSlot) + 1, 0, 0, 0);

    try {
      const response = await axios.post('/api/reservations', {
        court_id: id,
        user_name: formData.name,
        user_email: formData.email,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString()
      });

      const pinCode = response.data.pin;

      navigate('/reservation-success', {
        state: {
          courtName: court.name,
          complexName: court.complex_name,
          userName: formData.name,
          userEmail: formData.email,
          startTime: startTime.toLocaleString(),
          endTime: endTime.toLocaleString(),
          pinCode: pinCode
        }
      });
    } catch (error) {
      let msg = "Failed to create reservation.";
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setErrorMsg(msg);
    }
  };

  const generateSlotLabels = () => {
    const slots = [];
    for (let h = 7; h < 24; h++) {
      const from = `${String(h).padStart(2, '0')}:00`;
      const to = `${String(h + 1).padStart(2, '0')}:00`;
      slots.push(`${from} - ${to}`);
    }
    return slots;
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
                setSelectedSlots([]);
              }}
            >
              {day.toDateString().slice(0, 10)}
            </button>
          ))}
        </div>

        <h3>Select Time Slots</h3>
        <div className="slots-grid">
          {generateSlotLabels().map((label) => {
            const slotKey = label.split(' ')[0]; // "19:00"
            const isBooked = isSlotBooked(label);
            const isPast = isSlotPast(label);
            const isSelected = selectedSlots.includes(slotKey);

            return (
              <div
                key={label}
                className={`slot-tile
                  ${isSelected ? 'selected' : ''}
                  ${!isSelected && isBooked ? 'booked' : ''}
                  ${!isSelected && !isBooked && isPast ? 'past' : ''}`}
                onClick={() => {
                  if (!isBooked && !isPast) handleSlotClick(slotKey);
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>

      {selectedSlots.length > 0 && (
        <div className="reservation-card" ref={formRef}>
          <h2>Confirm Reservation</h2>
          {errorMsg && (
            <div className="reservation-error-message">
              {errorMsg}
            </div>
          )}
          <p className="selected-time">
            {selectedSlots[0]} → {`${String(parseInt(selectedSlots[selectedSlots.length - 1]) + 1).padStart(2, '0')}:00`}
          </p>
          
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrorMsg('');
            }}
          />

          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrorMsg('');
            }}
          />

          {formData.email && !isValidEmail(formData.email) && (
            <div className="reservation-error-message" style={{ marginTop: 8 }}>
              Please enter a valid email address.
            </div>
          )}

          <button
            className="reserve-button"
            onClick={handleCreateReservation}
            disabled={
              !formData.name.trim() ||
              !formData.email.trim() ||
              !isValidEmail(formData.email) ||
              selectedSlots.length === 0
            }
          >
            Confirm Reservation
          </button>
        </div>
      )}

    </div>
  );
}

function generateNextDays(n) {
  const days = [];
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push(date);
  }
  return days;
}

export default CourtPage;
