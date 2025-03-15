const db = require('../models/db');

exports.getAdminDashboard = async (req, res) => {
  try {
    const query = 'SELECT * FROM users WHERE role = "admin"';
    const admins = await db.query(query);
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAdminUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM users WHERE role = "user"';
    const users = await db.query(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
