import express from 'express';
import { movies } from '../data/store.js';
import { findMovieById } from '../middleware/findMovieById.js';
import { param, check, validationResult, query } from 'express-validator';

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

router.use(sanitizeInput);

router.get('/', 
  [
    query('min_year').optional().isInt().withMessage('min_year must be an integer'),
    query('max_year').optional().isInt().withMessage('max_year must be an integer'),
    query('min_year').optional().custom((value, { req }) => {
      if (req.query.max_year && parseInt(value) >= parseInt(req.query.max_year)) {
        throw new Error('min_year must be less than max_year');
      }
      return true;
    }),
    query('max_year').optional().custom((value, { req }) => {
      if (req.query.min_year && parseInt(value) <= parseInt(req.query.min_year)) {
        throw new Error('max_year must be greater than min_year');
      }
      return true;
    }),
  ], 
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { min_year, max_year } = req.query;
    let filteredMovies = movies;

    if (min_year && max_year) {
      filteredMovies = movies.filter(movie => movie.year >= min_year && movie.year <= max_year);
    }
    else if (min_year) {
      filteredMovies = movies.filter(movie => movie.year >= min_year);
    }
    else if (max_year) {
      filteredMovies = movies.filter(movie => movie.year <= max_year);
    }

    res.json(filteredMovies);
  }
);

router.get('/:id', 
  [
    param('id').isInt().withMessage('ID must be an integer'),
  ],
  findMovieById,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json(req.movie);
  }
);

router.post(
  '/',
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('year').isInt({ min: 1800, max: new Date().getFullYear() }).withMessage('Year must be a valid number'),
    check('genre').notEmpty().withMessage('Genre is required'),
    check('director').notEmpty().withMessage('Director is required')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, title, year, genre, director } = req.body;
    const newMovie = { id, title, year, genre, director };
    movies.push(newMovie);
    res.status(201).json({ message: 'Movie added', movie: newMovie });
  }
);

router.patch('/:id', 
  findMovieById,
  [
    check('title').optional().isString().withMessage('Title must be a string'),
    check('year').optional().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Year must be a valid integer between 1900 and the current year'),
    check('genre').optional().isString().withMessage('Genre must be a string'),
    check('director').optional().isString().withMessage('Director must be a string'),
  ], 
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, year, genre, director } = req.body;
    if (title) req.movie.title = title;
    if (year) req.movie.year = year;
    if (genre) req.movie.genre = genre;
    if (director) req.movie.director = director;

    res.json({ message: 'Movie updated', movie: req.movie });
  }
);

export default router;
