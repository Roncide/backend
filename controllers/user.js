const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('../models/db');


const users = require('../models/db');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await user.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
