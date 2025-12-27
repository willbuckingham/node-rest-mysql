import { param, body, validationResult } from 'express-validator';

export const validateId = [
  param('id').isInt({ min: 1 }).toInt()
];

export const validatePano = [
  body('title').trim().notEmpty().escape(),
  body('description').optional().trim().escape()
];

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
