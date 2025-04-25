// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import CourtDetailsPage from './pages/CourtDetailsPage'; (for later)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/courts/:id" element={<CourtDetailsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
