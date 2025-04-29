
// import React, { useEffect, useState } from 'react';
// import { useRef } from 'react'; // add to your imports
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './CourtPage.css';

// function CourtPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [court, setCourt] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [reservations, setReservations] = useState([]);
//   const [startSlot, setStartSlot] = useState(null);
//   const [endSlot, setEndSlot] = useState(null);
//   const [formData, setFormData] = useState({ name: '', email: '' });

//   const formRef = useRef(null);

//   useEffect(() => {
//     axios.get(`/api/courts/${id}`)
//       .then(res => {
//         setCourt(res.data.court);
//         setReservations(res.data.reservations);
//       })
//       .catch(err => console.error('Error fetching court:', err));
//   }, [id]);

//   useEffect(() => {
//     if (startSlot && endSlot && formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [startSlot, endSlot]);


//   if (!court) return <div>Loading...</div>;

//   const handleHourClick = (slot) => {
//     if (slot === startSlot && !endSlot) {
//       setStartSlot(null);
//       setEndSlot(null);
//       return;
//     }
  
//     if (!startSlot) {
//       setStartSlot(slot);
//       setEndSlot(null);
//     } else if (!endSlot) {
//       const startHour = parseInt(startSlot.split(':')[0]);
//       const clickedHour = parseInt(slot.split(':')[0]);
  
//       if (clickedHour <= startHour) {
//         // Clicked earlier or same hour → treat as new start
//         setStartSlot(slot);
//         setEndSlot(null);
//       } else {
//         // Clicked a valid end hour
//         const allSlots = generateHourSlots();
//         const startIdx = allSlots.indexOf(startSlot);
//         const endIdx = allSlots.indexOf(slot);
  
//         // ONLY check conflict between start and end (NOT including end slot)
//         const rangeSlots = allSlots.slice(startIdx, endIdx);
  
//         const conflict = rangeSlots.some(slotInRange =>
//           reservations.some(reservation =>
//             isTimeConflict(slotInRange, reservation, selectedDate)
//           )
//         );
  
//         if (conflict) {
//           alert('Selected range overlaps with a booked time.');
//           setStartSlot(null);
//           setEndSlot(null);
//         } else {
//           setEndSlot(slot);
//         }
//       }
//     } else {
//       setStartSlot(slot);
//       setEndSlot(null);
//     }
//   };
  
  
//   const handleCreateReservation = async () => {
//     if (!startSlot || !endSlot) {
//       alert('Please select a valid start and end hour.');
//       return;
//     }
  
//     if (!isValidReservation()) {
//       alert('Reservation time conflicts with an existing booking.');
//       return;
//     }
  
//     try {
//       const startTime = new Date(selectedDate);
//       const startHour = parseInt(startSlot.split(':')[0]);
//       const startMinute = parseInt(startSlot.split(':')[1]);
//       startTime.setHours(startHour);
//       startTime.setMinutes(startMinute);
  
//       const endTime = new Date(selectedDate);
//       const endHour = parseInt(endSlot.split(':')[0]);
//       const endMinute = parseInt(endSlot.split(':')[1]);
//       endTime.setHours(endHour);
//       endTime.setMinutes(endMinute);
  
//       const response = await axios.post('/api/reservations', {
//         court_id: id,
//         user_name: formData.name,
//         user_email: formData.email,
//         start_time: startTime.toISOString(),
//         end_time: endTime.toISOString()
//       });
  
//       // Generate random 6-digit PIN
//       const pinCode = Math.floor(100000 + Math.random() * 900000);
  
//       // Navigate to Reservation Success page
//       navigate('/reservation-success', {
//         state: {
//           courtName: court.name,
//           complexName: court.complex_name,
//           userName: formData.name,
//           userEmail: formData.email,
//           startTime: startTime.toLocaleString(),
//           endTime: endTime.toLocaleString(),
//           pinCode: pinCode
//         }
//       });
  
//     } catch (error) {
//       console.error('Error creating reservation:', error);
//       alert('Failed to create reservation.');
//     }
//   };
  

//   const isValidReservation = () => {
//     const allSlots = generateHourSlots();
//     const startIdx = allSlots.indexOf(startSlot);
//     const endIdx = allSlots.indexOf(endSlot);

//     for (let i = startIdx; i < endIdx; i++) {
//       if (reservations.some(reservation =>
//         isTimeConflict(allSlots[i], reservation, selectedDate)
//       )) {
//         return false;
//       }
//     }
//     return true;
//   };

//   return (
//     <div className="courtpage-wrapper">
//       <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

//       <div className="court-hero">
//         <h1 className="court-name">{court.name}</h1>
//         <p className="complex-name">📍 {court.complex_name}</p>
//       </div>

//       <div className="info-card">
//         <div className="map-section">
//           <iframe
//             title="map"
//             width="100%"
//             height="100%"
//             frameBorder="0"
//             style={{ border: 0 }}
//             src={`https://www.google.com/maps?q=${encodeURIComponent(court.location)}&output=embed`}
//             allowFullScreen
//           />
//         </div>
//         <div className="photo-section">
//           <img src={court.image_url || "default.jpg"} alt="Court" />
//         </div>
//       </div>

//       <div className="calendar-card">
//         <h2>Select a Day</h2>
//         <div className="day-selector">
//           {generateNextDays(7).map(day => (
//             <button
//               key={day.toDateString()}
//               className={`day-button ${day.toDateString() === selectedDate.toDateString() ? 'active' : ''}`}
//               onClick={() => {
//                 setSelectedDate(day);
//                 setStartSlot(null);
//                 setEndSlot(null);
//               }}
//             >
//               {day.toDateString().slice(0, 10)}
//             </button>
//           ))}
//         </div>

//         <h3>Select Time Range</h3>
//         <div className="hours-grid">
//           {generateHourSlots().map((slot) => {
//             const isBooked = reservations.some(reservation =>
//               isTimeConflict(slot, reservation, selectedDate)
//             );

//             const isInSelectedRange = startSlot && endSlot && (slot >= startSlot && slot < endSlot);
//             const isStart = startSlot === slot;
//             const isEnd = endSlot === slot;

//             return (
//               <div
//                 key={slot}
//                 className={`hour-slot 
//                   ${isBooked ? 'booked' : ''}
//                   ${isInSelectedRange ? 'selected' : ''}
//                   ${isStart ? 'start-slot' : ''}
//                   ${isEnd ? 'end-slot' : ''}`}
//                 onClick={() => {
//                   if (!isBooked) handleHourClick(slot);
//                 }}
//               >
//                 {slot}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {startSlot && endSlot && (
//         <div className="reservation-card" ref={formRef}>
//           <h2>Confirm Reservation</h2>
//           <p className="selected-time">
//             {startSlot} → {endSlot}
//           </p>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           />
//           <button className="reserve-button" onClick={handleCreateReservation}>
//             Confirm Reservation
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // Helpers
// function generateNextDays(n) {
//   const days = [];
//   for (let i = 0; i < n; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() + i);
//     days.push(date);
//   }
//   return days;
// }

// function generateHourSlots() {
//   const hours = [];
//   for (let h = 7; h <= 23; h++) {
//     hours.push(`${h}:00`);
//   }
//   return hours;
// }

// function isTimeConflict(slot, reservation, selectedDate) {
//   const slotHour = parseInt(slot.split(':')[0]);
//   const resStart = new Date(reservation.start_time);
//   const resEnd = new Date(reservation.end_time);
//   return (
//     resStart.getDate() === selectedDate.getDate() &&
//     resStart.getMonth() === selectedDate.getMonth() &&
//     resStart.getFullYear() === selectedDate.getFullYear() &&
//     resStart.getHours() <= slotHour &&
//     resEnd.getHours() > slotHour
//   );
// }

// export default CourtPage;

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

  const handleSlotClick = (slot) => {
    const isBooked = isSlotBooked(slot);
    if (isBooked) return;

    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot].sort());
    }
  };

  const handleCreateReservation = async () => {
    if (selectedSlots.length === 0) {
      alert('Please select at least one time slot.');
      return;
    }

    const startSlot = selectedSlots[0];
    const endSlot = selectedSlots[selectedSlots.length - 1];

    const startTime = new Date(selectedDate);
    const endTime = new Date(selectedDate);
    startTime.setHours(parseInt(startSlot.split(':')[0]), 0, 0, 0);
    endTime.setHours(parseInt(endSlot.split(':')[0]) + 1, 0, 0, 0);

    try {
      await axios.post('/api/reservations', {
        court_id: id,
        user_name: formData.name,
        user_email: formData.email,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString()
      });

      const pinCode = Math.floor(100000 + Math.random() * 900000);

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
      console.error('Reservation failed:', error);
      alert('Failed to create reservation.');
    }
  };

  const generateSlotLabels = () => {
    const slots = [];
    for (let h = 7; h < 24; h++) {
      slots.push(`${h}:00 - ${h + 1}:00`);
    }
    return slots;
  };

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
          {generateSlotLabels().map((label) => (
            <div
              key={label}
              className={`slot-tile
                ${isSlotBooked(label) ? 'booked' : ''}
                ${selectedSlots.includes(label.split(' ')[0]) ? 'selected' : ''}`}
              onClick={() => handleSlotClick(label.split(' ')[0])}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {selectedSlots.length > 0 && (
        <div className="reservation-card" ref={formRef}>
          <h2>Confirm Reservation</h2>
          <p className="selected-time">
            {selectedSlots[0]} → {parseInt(selectedSlots[selectedSlots.length - 1]) + 1}:00
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
