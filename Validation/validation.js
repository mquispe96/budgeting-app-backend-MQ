export const hasAllRequiredFields = (req, res, next) => {
  const {name, amount, from, category, type} = req.body;
  if (!name || !amount || !from || !category) {
    return res.status(400).send('Missing required fields');
  }
  return next();
};

export const validateDataTypes = (req, res, next) => {
  const {name, amount, from, category, type} = req.body;
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
