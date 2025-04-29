// // src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourtPage from './pages/CourtPage';
import ReservationSuccessPage from './pages/ReservationSuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courts/:id" element={<CourtPage />} />
        <Route path="/reservation-success" element={<ReservationSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;

