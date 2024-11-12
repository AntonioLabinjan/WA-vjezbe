import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

import proizvodiRouter from './routes/proizvodi.js';
app.use('/proizvodi', proizvodiRouter);

const PORT = 3000;
app.get('/', (req, res) => {
res.send('Webshop API');
});
app.listen(PORT, error => {
if (error) {
console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
} else {
console.log(`Server dela na http://localhost:${PORT}`);
}
});