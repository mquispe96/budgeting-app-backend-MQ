import express from 'express';
import {nanoid} from 'nanoid';
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
  usernamesDB.push({...req.body,id: nanoid(6), previousPasswords});
  res.json(usernamesDB[usernamesDB.length - 1]);
});
usernames.post('/login', usernameExists, checkPassword, (req, res) => {
  const {username} = req.body;
  const user = usernamesDB.find(user => user.username === username);
  res.json(user);
});
usernames.put('/:id', (req, res) => {
  const {id} = req.params;
  const userIndex = usernamesDB.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({error: 'User not found'});
  }
  const {password} = req.body;
  usernamesDB[userIndex].password = password;
  res.json(usernamesDB[userIndex]);
});
usernames.delete('/:id', (req, res) => {
  const {id} = req.params;
  const userIndex = usernamesDB.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({error: 'User not found'});
  }
  usernamesDB.splice(userIndex, 1);
  res.json({success: 'User deleted'});
});

export default usernames;
