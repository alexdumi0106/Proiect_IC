const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Login failed' });
  }
};
