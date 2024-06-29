import express from 'express';
import usernamesDB from '../Models/usernames.model.js';
import {
  validateUsername,
  itsNewUsername,
  itsNewPassword,
} from '../Validation/validation.js';

const usernames = express.Router();

usernames.get('/', (req, res) => res.json({error: 'Access Denied'}));
usernames.get('/:username', (req, res) => {
  const {username} = req.params;
  const user = usernamesDB.find(user => user.username === username);
  if (user) {
    res.json({success: 'User found'});
  } else {
    res.status(404).json({error: 'User not found'});
  }
});
usernames.post('/', validateUsername, itsNewUsername, (req, res) => {
  const previousPasswords = [req.body.password];
  usernamesDB.push({...req.body, previousPasswords});
  res.json({success: 'User created'});
});
usernames.put('/:username', itsNewPassword, (req, res) => {
  const {username} = req.params;
  const userIndex = usernamesDB.findIndex(user => user.username === username);
  usernamesDB[userIndex].password = req.body.password;
  res.json({success: 'User updated'});
});
usernames.delete('/:username', (req, res) => {
  const {username} = req.params;
  const userIndex = usernamesDB.findIndex(user => user.username === username);
  if (userIndex > -1) {
    usernamesDB.splice(userIndex, 1);
    res.json({success: 'User deleted'});
  } else {
    res.status(404).json({error: 'User not found'});
  }
});

export default usernames;
