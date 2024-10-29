const express = require("express");
const port = 3000;

const app = express();
app.use(express.json());

const pizze = [
    { id: 1, naziv: "Margerita", cijena: 7.00 },
    { id: 2, naziv: "Capricciosa", cijena: 9.00 },
    { id: 3, naziv: "Šunka sir", cijena: 8.00 },
    { id: 4, naziv: "Vegetariana", cijena: 12.00 },
];

let narudzbe = []; 

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

app.post("/naruci", (req, res) => {
    const { narudzba, prezime, adresa, broj_telefona } = req.body;

    if (!narudzba || !prezime || !adresa || !broj_telefona) {
        return res.status(400).json({ message: "Niste poslali sve potrebne podatke za narudžbu!" });
    }

    if (!Array.isArray(narudzba)) {
        return res.status(400).json({ message: "Narudžba mora biti niz stavki." });
    }

    const kljucevi = ["pizza", "velicina", "kolicina"];
    let ukupna_cijena = 0;
    let narucene_pizze = [];

    for (let stavka of narudzba) {
        for (let kljuc of kljucevi) {
            if (!Object.keys(stavka).includes(kljuc)) {
                return res.status(400).json({ message: `Svaka stavka narudžbe mora imati ${kljucevi.join(", ")}!` });
            }
        }

        const { pizza, velicina, kolicina } = stavka;

        if (typeof kolicina !== 'number' || kolicina <= 0) {
            return res.status(400).json({ message: "Količina mora biti broj veći od nule!" });
        }

        const pizzaPostoji = pizze.find(p => p.naziv === pizza);
        if (!pizzaPostoji) {
            return res.status(400).json({ message: `Pizza ${pizza} ne postoji u jelovniku!` });
        }

        narucene_pizze.push(`${pizza} (${velicina})`);
        ukupna_cijena += pizzaPostoji.cijena * kolicina;
    }

    narudzbe.push({ narudzba, prezime, adresa, broj_telefona, ukupna_cijena });

    res.json({
        message: `Vaša narudžba za ${narucene_pizze.join(" i ")} je uspješno zaprimljena!`,
        prezime: prezime,
        adresa: adresa,
        ukupna_cijena: ukupna_cijena
    });
});



app.listen(port, (error) => {
    if (error) {
        console.log("ERROR!");
    } else {
        console.log(`Slušam na portu ${port}`);
    }
});
