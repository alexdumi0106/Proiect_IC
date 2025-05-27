import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import './ReservationSuccessPage.css';

function ReservationSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="reservation-success-page">
      <h1>🎾 An Email to confirm your reservation was sent!</h1>
      <div className="reservation-details">
        <p><strong>Court:</strong> {state.courtName}</p>
        <p><strong>Complex:</strong> {state.complexName}</p>
        <p><strong>Name:</strong> {state.userName}</p>
        <p><strong>Email:</strong> {state.userEmail}</p>
        <p><strong>From:</strong> {state.startTime}</p>
        <p><strong>To:</strong> {state.endTime}</p>
        <p className="pin-code"><strong>Your PIN code will be available in the Confirmation Email!</strong></p>
      </div>
      <button onClick={() => navigate('/')} className="go-home-btn">
        Go Back to Home
      </button>
    </div>
  );
}

export default ReservationSuccessPage;
