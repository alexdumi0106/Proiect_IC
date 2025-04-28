const reservationsService = require('../services/reservationsService');

exports.createReservation = async (req, res) => {
  const { court_id, user_name, user_email, start_time, end_time } = req.body;

  // 1. Validare input
  if (!court_id || !user_name || !user_email || !start_time || !end_time) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // 2. Verifică conflictele de timp
    const conflict = await reservationsService.checkTimeConflict(court_id, start_time, end_time);
    
    if (conflict) {
      return res.status(409).json({ message: 'Time slot already booked' });
    }

    // 3. Dacă nu există conflict, creează rezervarea
    const newReservation = await reservationsService.createReservation(court_id, user_name, user_email, start_time, end_time);
    
    // 4. Returnează 201 Created
    res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
