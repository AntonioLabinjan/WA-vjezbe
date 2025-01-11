import express from 'express';
import moviesRouter from './routes/movies.js';
import actorsRouter from './routes/actors.js';

const app = express();
const port = 3000; 

app.use(express.json());

app.use((req, res, next) => {
  const appName = 'movie-server';
  const now = new Date();
  const currentDateTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  console.log('[' + appName + '] [' + currentDateTime + '] ' + req.method + ' ' + req.originalUrl);
  next();
});

app.use('/movies', moviesRouter);
app.use('/actors', actorsRouter);

app.listen(port, () => {
  console.log(`Movie server is running on http://localhost:${port}`);
});
