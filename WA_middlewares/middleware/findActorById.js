import { actors } from '../data/store.js';

export function findActorById(req, res, next) {
  const actorId = parseInt(req.params.id);
  const actor = actors.find(a => a.id === actorId);

  if (!actor) {
    return res.status(404).json({ error: 'Ni glumca' });
  }

  req.actor = actor; 
  next();
}
