const express = require('express');
const router = express.Router();
// routes here
const authm = require('../middleware/authm');
const role = require('../middleware/role');
const auth = require('../controllers/auth');
const user = require('../controllers/user');
const admin = require('../controllers/admin');
const chapterPresident = require('../controllers/chapterPresident');
const dashboard = require('../controllers/dashboard');

// authm middleware to all routes
router.use(authm.authenticate);

// role middleware to admin and chapter president routes
router.use('/admin', role.authorize);
router.use('/chapterPresident', role.authorize);

// Auth Routes
router.use(authm.authenticate);
router.post('/login', auth.login);
router.post('/register', auth.register);

// User Routes
router.get('/user', user.getAllUsers);
router.get('/user/:id', user.getUserById);
router.post('/user',user.createUser);

// Admin Routes
router.use('/admin', role.authorize);
router.get('/admin/dashboard', admin.getAdminDashboard);
router.get('/amdin/user', admin.getAdminUsers);
router.put('/user/:id',user.updateUser);
router.delete('/user/:id',user.deleteUser);


// Chapter President Routes
router.use('/chapterPresident', role.authorize);
router.get('/chapterPresident/dashboard', chapterPresident.getChapterPresidentDashboard);
router.get('/chapterPresident/user', chapterPresident.getChapterPresidentUsers);


// Dashboard Routes
router.get('/dashboard/:id', dashboard.getUserDashboard);

// results
router.get('/api',(req,res) =>{
    res.send('API is working');
});

module.exports = router;