import React from 'react';
import './CourtCard.css';

function CourtCard({ court }) {
  const handleDetailsClick = () => {
    window.location.href = `/courts/${court.id}`;
  };

  return (
    <div className="court-card">
      {/* Image Top */}
      <div className="court-image">
        <img src={court.image_url || "default.jpg"} alt="Court" />
      </div>

      {/* Info Section */}
      <div className="court-info">
        <p className="complex-name">{court.complex_name}</p>
        <h2 className="court-name">{court.name}</h2>
        <p className="court-location">📍 {court.location}</p>

        {/* View Details Button */}
        <button className="details-btn" onClick={handleDetailsClick}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default CourtCard;
