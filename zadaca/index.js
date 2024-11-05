import express from "express";

let app = express();

import nekretnineRouter from './routes/nekretnine.js';

app.use(express.json());
app.use('/nekretnine', nekretnineRouter);

app.get("/", (req, res) => {
    res.json('AGENCIJA');
});



const port = 3000;

app.listen(port, (error) => {
    if (error) {
        console.log("Error: " + error);
    } else {
        console.log("Vrtiii Miško on port " + port);
    }
});
