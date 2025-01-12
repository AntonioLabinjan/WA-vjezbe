import express from 'express';
import { actors } from '../data/store.js';
import { findActorById } from '../middleware/findActorById.js';
import { check, validationResult, param } from 'express-validator';

const sanitizeInput = (req, res, next) => {
  if (req.params.name) {
    req.params.name = req.params.name.trim();
  }
  if (req.body.name) {
    req.body.name = req.body.name.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
  }
  next();
};

const router = express.Router();

router.get('/:name', 
  [
    param('name').isString().withMessage('Ime mora bit string'),
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
    param('id').isInt().withMessage('ID mora bit cijeli broj'),
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
    check('name').notEmpty().withMessage('Nemaš ime, a triba ti').isString().withMessage('Ime mora bit string'),
    check('birthYear').notEmpty().withMessage('Nemaš godinu rođenja, a triba ti').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Godina mora bit integer u rasponu od 1900 do 2025'),
  ],
  sanitizeInput,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, birthYear, movies } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Fali ti id' });
    }

    actors.push({ id, name, birthYear, movies: movies || [] });
    res.status(201).json({ message: 'Glumac dodan', actor: { id, name, birthYear, movies: movies || [] } });
  }
);

router.patch('/:id', 
  findActorById, 
  [
    check('name').optional().isString().withMessage('Ime mora bit string'),
    check('birthYear').optional().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Godina mora bit integer u rasponu od 1900 do 2025'),
  ], 
  sanitizeInput,
  (req, res) => {
    if (!req.body.name && !req.body.birthYear) {
      return res.status(400).json({ error: 'Fale podaci za updt' });
    }
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, birthYear, movies } = req.body;
    if (name) req.actor.name = name;
    if (birthYear) req.actor.birthYear = birthYear;
    if (movies) req.actor.movies = movies;
  
    res.json({ message: 'Glumac azuriran', actor: req.actor });
  }
);

export default router;
