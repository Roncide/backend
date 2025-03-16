const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const chapterPresidentController = require('../controllers/chapterPresidentController');
const dashboardController = require('../controllers/dashboardController');

const authMiddleware = require('../middleware/authMiddleware');
const db = require('../db');

router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

router.get('/admin/dashboard', authMiddleware, adminController.getAdminDashboard);
router.get('/admin/users', authMiddleware, adminController.getAdminUsers);

router.get('/chapter-president/dashboard', authMiddleware, chapterPresidentController.getChapterPresidentDashboard);
router.get('/chapter-president/users', authMiddleware, chapterPresidentController.getChapterPresidentUsers);

router.get('/dashboard/:id', authMiddleware, dashboardController.getUserDashboard);

router.put('/users/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: 'Name, email, and role are required' });
    }

    const query = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';
    const result = await db.query(query, [name, email, role, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/users/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM users WHERE id = ?';
    const result = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
