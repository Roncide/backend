const express = require('express');
const router = express.Router();

// routes 
const authm = require('../middleware/authm');
const role = require('../middleware/role');
const auth = require('../controllers/auth');
const user = require('../controllers/user');
const admin = require('../controllers/admin');
const chapterPresident = require('../controllers/chapterPresident');
const dashboard = require('../controllers/dashboard');

// Applying authentication middleware globally for all routes except login/register
router.use(authm.authenticate);

// Apply role-based authorization middleware for admin and chapterPresident routes
router.use('/admin', role.authorize);
router.use('/chapterPresident', role.authorize);

// Auth Routes - No authentication needed here
router.post('/login', auth.login);
router.post('/register', auth.register);

// User Routes
router.get('/user', user.getAllUsers);
router.get('/user/:id', user.getUserById);
router.post('/user', user.createUser);

// Admin Routes
// role.authorize middleware is already applied at the '/admin' level
router.get('/admin/dashboard', admin.getAdminDashboard);
router.get('/admin/user', admin.getAdminUsers); // Corrected typo 'amdin' -> 'admin'
router.put('/user/:id', user.updateUser);
router.delete('/user/:id', user.deleteUser);

// Chapter President Routes
// role.authorize middleware is already applied at the '/chapterPresident' level
router.get('/chapterPresident/dashboard', chapterPresident.getChapterPresidentDashboard);
router.get('/chapterPresident/user', chapterPresident.getChapterPresidentUsers);

// Dashboard Routes
router.get('/dashboard/:id', dashboard.getUserDashboard);

// Test API Route
router.get('/api', (req, res) => {
    res.send('API is working');
});

module.exports = router;
