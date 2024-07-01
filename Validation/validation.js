import usernamesDB from '../Models/usernames.model.js';

export const hasAllRequiredFields = (req, res, next) => {
  const keyNames = Object.keys(req.body);
  if (!keyNames.every(key => req.body[key])) {
    const missingFields = keyNames.filter(key => !req.body[key]);
    return res.status(400).json(missingFields);
  }
  return next();
};

export const validateDataTypes = (req, res, next) => {
  const {name, amount, from, category} = req.body;
  if (
    typeof name !== 'string' ||
    typeof from !== 'string' ||
    typeof category !== 'string' ||
    typeof amount !== 'number'
  ) {
    return res.status(400).json({error: 'Invalid data types'});
  }
  return next();
};

export const usernameExists = (req, res, next) => {
  const {username} = req.body;
  const user = usernamesDB.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({error: 'User not found'});
  }
  return next();
};

export const checkPassword = (req, res, next) => {
  const {username, password} = req.body;
  const user = usernamesDB.find(user => user.username === username);
  if (user.password !== password) {
    return res.status(400).json({error: 'Invalid password'});
  }
  return next();
};

export const validateUsername = (req, res, next) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const {username} = req.body;
  if (!regex.test(username)) {
    return res.status(400).json({error: 'Invalid username'});
  }
  return next();
};

export const itsNewUsername = (req, res, next) => {
  const {username} = req.body;
  const user = usernamesDB.find(user => user.username === username);
  if (user) {
    return res.status(400).json({error: 'Username already exists'});
  }
  return next();
};

export const itsNewPassword = (req, res, next) => {
  const user = usernamesDB.find(user => user.username === req.body.username);
  if (user.previousPasswords.includes(req.body.password)) {
    return res.status(400).json({error: 'Password already used'});
  }
  return next();
};
