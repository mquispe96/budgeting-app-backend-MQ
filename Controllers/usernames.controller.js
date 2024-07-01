import express from 'express';
import usernamesDB from '../Models/usernames.model.js';
import {
  usernameExists,
  checkPassword,
  validateUsername,
  itsNewUsername,
  itsNewPassword,
} from '../Validation/validation.js';

const usernames = express.Router();

usernames.get('/', (req, res) => res.json({error: 'Access Denied'}));
usernames.get('/login', usernameExists, checkPassword, (req, res) => {
  res.json({success: 'Login successful'});
});
usernames.post('/', validateUsername, itsNewUsername, (req, res) => {
  const previousPasswords = [req.body.password];
  usernamesDB.push({...req.body, previousPasswords});
  res.json({success: 'User created'});
});
usernames.put('/update', usernameExists, itsNewPassword, (req, res) => {
  const {username, password} = req.body;
  const userIndex = usernamesDB.findIndex(user => user.username === username);
  usernamesDB[userIndex].password = password;
  res.json({success: 'User updated'});
});
usernames.delete('/delete', (req, res) => {
  const {username} = req.body;
  const userIndex = usernamesDB.findIndex(user => user.username === username);
  if (userIndex > -1) {
    usernamesDB.splice(userIndex, 1);
    res.json({success: 'User deleted'});
  } else {
    res.status(404).json({error: 'User not found'});
  }
});

export default usernames;
