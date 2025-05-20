import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourtPage from './pages/CourtPage';
import ReservationSuccessPage from './pages/ReservationSuccessPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courts/:id" element={<CourtPage />} />
        <Route path="/reservation-success" element={<ReservationSuccessPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <RequireAuth>
            <AdminPage />
          </RequireAuth>
        } />
      </Routes>
    </Router>
  );
}

export default App;
