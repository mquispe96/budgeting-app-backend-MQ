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
usernames.post('/', validateUsername, itsNewUsername, (req, res) => {
  const previousPasswords = [req.body.password];
  usernamesDB.push({...req.body, previousPasswords});
  res.json({success: 'User created'});
});
usernames.post('/login', usernameExists, checkPassword, (req, res) => {
  res.json({success: 'Login successful'});
});
usernames.put('/update', usernameExists, itsNewPassword, (req, res) => {
  const {username, password} = req.body;
  const userIndex = usernamesDB.findIndex(user => user.username === username);
  usernamesDB[userIndex].password = password;
  res.json({success: 'User updated'});
});
usernames.delete('/delete', usernameExists, checkPassword, (req, res) => {
  const {username} = req.body;
  const userIndex = usernamesDB.findIndex(user => user.username === username);
  usernamesDB.splice(userIndex, 1);
  res.json({success: 'User deleted'});
});

export default usernames;
