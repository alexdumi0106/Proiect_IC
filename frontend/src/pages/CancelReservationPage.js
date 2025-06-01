import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CancelReservationPage.css";

function CancelReservationPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");
  const hasRun = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get("token");
    if (!token) {
      setStatus("missing");
      return;
    }
    axios
      .get(`/api/reservations/cancel/${token}`)
      .then(() => setStatus("success"))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setStatus("alreadyCancelled");
        } else {
          setStatus("error");
        }
      });
  }, [searchParams]);

  useEffect(() => {
    if (status === "success" || status === "alreadyCancelled") {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [status, navigate]);

  let icon = "⏳", heading = "Processing cancellation...", subtext = "Please wait.";

  if (status === "success") {
    icon = "✅";
    heading = "Reservation Cancelled";
    subtext = "Your reservation was successfully cancelled. You’ll be redirected shortly.";
  } else if (status === "alreadyCancelled") {
    icon = "⚠️";
    heading = "Already Cancelled";
    subtext = "This reservation was already cancelled or the link is no longer valid. You’ll be redirected shortly.";
  } else if (status === "missing") {
    icon = "❌";
    heading = "Invalid Link";
    subtext = "The cancellation link is invalid or missing a token.";
  } else if (status === "error") {
    icon = "❌";
    heading = "Error";
    subtext = "Something went wrong while cancelling your reservation. Please try again or contact support.";
  }

  return (
    <div className="cancel-reservation-bg">
      <div className="cancel-reservation-card">
        <div className="cancel-reservation-icon">{icon}</div>
        <div className="cancel-reservation-heading">{heading}</div>
        <div className="cancel-reservation-subtext">{subtext}</div>
        {(status === "success" || status === "alreadyCancelled") &&
          <button
            className="cancel-reservation-home-btn"
            onClick={() => navigate("/")}
          >Back to Home</button>
        }
      </div>
    </div>
  );
}

export default CancelReservationPage;
