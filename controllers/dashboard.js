const db = require('../models/db');

exports.getUserDashboard = async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';
    const user = await db.query(query, [id]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
