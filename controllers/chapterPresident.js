const db = require('../models/db');

exports.getChapterPresidentDashboard = async (req, res) => {
  try {
    const query = 'SELECT * FROM users WHERE role = "C-president"';
    const chapterPresidents = await db.query(query);
    res.json(chapterPresidents);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getChapterPresidentUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM users WHERE role = "user" AND chapter = "chapter_name"';
    const users = await db.query(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
