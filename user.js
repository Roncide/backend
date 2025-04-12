const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    create: (userData, callback) => {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        const query = 'INSERT INTO users (username, password, role, branch) VALUES (?, ?, ?, ?)';
        db.query(query, [userData.username, hashedPassword, userData.role, userData.branch], callback);
    },
    
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    }
};

module.exports = User;