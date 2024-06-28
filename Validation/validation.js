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
    return res.status(400).send('Invalid data types');
  }
  return next();
};
