import express from "express"
import pizzeRouter from './routes/pizze.js';
import narudzbeRouter from './routes/narudzbe.js';
const port = 3000;


const app = express();
app.use(express.json());
app.use('/pizze', pizzeRouter);
app.use('/narudzbe', narudzbeRouter);

const pizze = [
    { id: 1, naziv: "Margerita", cijena: 7.00 },
    { id: 2, naziv: "Capricciosa", cijena: 9.00 },
    { id: 3, naziv: "Šunka sir", cijena: 8.00 },
    { id: 4, naziv: "Vegetariana", cijena: 12.00 },
];

//let narudzbe = []; 

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/pizze", (req, res) => {
    res.json(pizze);
});

app.get("/pizze/:id", (req, res) => {
    const id_pizza = parseInt(req.params.id);
    const pizza = pizze.find(p => p.id === id_pizza);

    if (!pizza) {
        return res.status(404).json({ message: "Nema pizze s tim ID-jem" });
    }
    res.json(pizza);
});



// PUT metoda - mijenja cijeli objekt
// tijelo zahtjeva:  { id: 1, naziv: "Margerita", cijena: 7.00 },
app.delete('/narudzbe/:id', (req, res) => {
    let id_narudzba_req = req.params.id;

    if (isNaN(id_narudzba_req)) {
        return res.json({ message: 'Proslijedili ste parametar id koji nije broj!' });
    }

    let index = narudzbe.findIndex(narudzba => narudzba.id == id_narudzba_req);
    if (index === -1) {
        return res.json({ message: 'Narudzba not found' });
    }


    const obrisano = narudzbe.splice(index, 1);

    console.log('Updated narudzbe array after deletion', pizze);

    return res.json({ message: 'Narudzba deleted', obrisani_podatak: obrisano[0] });
});



// delete koristi splice

app.delete('/pizze/:id', (req, res) => {
    let id_pizza_req = req.params.id;

    if (isNaN(id_pizza_req)) {
        return res.json({ message: 'Proslijedili ste parametar id koji nije broj!' });
    }

    let index = pizze.findIndex(pizza => pizza.id == id_pizza_req);
    if (index === -1) {
        return res.json({ message: 'Pizza not found' });
    }


    const obrisano = pizze.splice(index, 1);

    console.log('Updated pizze array after deletion', pizze);

    return res.json({ message: 'Pizza deleted', obrisani_podatak: obrisano[0] });
});




app.listen(port, (error) => {
    if (error) {
        console.log("ERROR!");
    } else {
        console.log(`Slušam na portu ${port}`);
    }
});
