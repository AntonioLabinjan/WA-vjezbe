import express from 'express';
import { actors } from '../data/store.js';
import { findActorById } from '../middleware/findActorById.js';
import { check, validationResult, param } from 'express-validator';

const sanitizeInput = (req, res, next) => {
  if (req.params.name) {
    req.params.name = req.params.name.trim();
  }
  if (req.body.name) {
    req.body.name = req.body.name.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Prevent XSS by replacing < and > signs
  }
  next();
};

const router = express.Router();

router.get('/:name', 
  [
    param('name').isString().withMessage('Name must be a string'),
  ],
  sanitizeInput,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.params;
    const filteredActors = actors.filter(actor => actor.name.toLowerCase().includes(name.toLowerCase()));
    res.json(filteredActors);
  }
);

router.get('/:id', 
  [
    param('id').isInt().withMessage('ID must be an integer'),
  ], 
  sanitizeInput,
  findActorById, 
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.json(req.actor);
  }
);

router.post('/', 
  [
    check('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    check('birthYear').notEmpty().withMessage('BirthYear is required').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('BirthYear must be a valid integer between 1900 and the current year'),
  ],
  sanitizeInput,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, birthYear, movies } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing required field: id' });
    }

    actors.push({ id, name, birthYear, movies: movies || [] });
    res.status(201).json({ message: 'Actor added', actor: { id, name, birthYear, movies: movies || [] } });
  }
);

router.patch('/:id', 
  findActorById, 
  [
    check('name').optional().isString().withMessage('Name must be a string'),
    check('birthYear').optional().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('BirthYear must be a valid integer between 1900 and the current year'),
  ], 
  sanitizeInput,
  (req, res) => {
    if (!req.body.name && !req.body.birthYear) {
      return res.status(400).json({ error: 'At least one of name or birthYear is required to update' });
    }
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, birthYear, movies } = req.body;
    if (name) req.actor.name = name;
    if (birthYear) req.actor.birthYear = birthYear;
    if (movies) req.actor.movies = movies;
  
    res.json({ message: 'Actor updated', actor: req.actor });
  }
);

export default router;
