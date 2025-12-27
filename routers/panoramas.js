import { Router } from 'express';
import pool from '../db.js';
import { validateId, validatePano, handleValidation } from '../middleware/validate.js';

const router = Router();

// GET all panoramas
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM panos');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET panorama by id
router.get('/:id', validateId, handleValidation, async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM panos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST new panorama
router.post('/', validatePano, handleValidation, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query(
      'INSERT INTO panos (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    next(err);
  }
});

// PUT update panorama
router.put('/:id', validateId, validatePano, handleValidation, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query(
      'UPDATE panos SET title = ?, description = ? WHERE id = ?',
      [title, description, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Updated' });
  } catch (err) {
    next(err);
  }
});

// DELETE panorama
router.delete('/:id', validateId, handleValidation, async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM panos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
