const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

const JWT_SECRET = 'super_secret_key'; // ideal, păstrat în .env

exports.login = async (username, password) => {
  const admin = await authModel.getAdminByUsername(username);
  if (!admin) throw { status: 401, message: 'Invalid credentials' };

  const isValid = await bcrypt.compare(password, admin.password_hash);
  if (!isValid) throw { status: 401, message: 'Invalid credentials' };

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};
