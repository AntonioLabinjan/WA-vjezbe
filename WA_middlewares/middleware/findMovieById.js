import { movies } from '../data/store.js';

export function findMovieById(req, res, next) {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    return res.status(404).json({ error: 'Ni filma' });
  }

  req.movie = movie; 
  next();
}
