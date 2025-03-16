const express = require('express');
const router = express.Router();

// Import Controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const chapterPresidentController = require('../controllers/chapterPresidentController');
const dashboardController = require('../controllers/dashboardController');

// Middleware 
const authMiddleware = require('../middleware/authMiddleware'); // If using authentication

// **Authentication Routes**
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// **User Routes**
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

// **Admin Routes (Protected)**
router.get('/admin/dashboard', authMiddleware, adminController.getAdminDashboard);
router.get('/admin/users', authMiddleware, adminController.getAdminUsers);

// **Chapter President Routes (Protected)**
router.get('/chapter-president/dashboard', authMiddleware, chapterPresidentController.getChapterPresidentDashboard);
router.get('/chapter-president/users', authMiddleware, chapterPresidentController.getChapterPresidentUsers);

// **Dashboard Routes (User-specific)**
router.get('/dashboard/:id', authMiddleware, dashboardController.getUserDashboard);

module.exports = router;
