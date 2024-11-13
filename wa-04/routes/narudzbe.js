import express from "express";
import { Proizvod, proizvodi } from '../data.js';

const router = express.Router();

class Narudzba {
    constructor(id, naruceniProizvodi) {
        this.id = id;
        this.naruceniProizvodi = naruceniProizvodi;
    }

    get ukupnaCijena() {
        return this.naruceniProizvodi.reduce((total, naruceniProizvod) => {
            const proizvod = proizvodi.find(p => p.id === naruceniProizvod.id);
            return proizvod ? total + (proizvod.cijena * naruceniProizvod.narucenaKolicina) : total;
        }, 0);
    }
}

const narudzbe = [
    new Narudzba(1, [
        { id: 1, velicina: 'XS', narucenaKolicina: 5 },
        { id: 5, velicina: '43', narucenaKolicina: 1 },
    ]),
];

router.post("/", (req, res) => {
    const { naruceniProizvodi } = req.body;

    if (!naruceniProizvodi || !Array.isArray(naruceniProizvodi)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const newOrderId = narudzbe.length > 0 ? narudzbe[narudzbe.length - 1].id + 1 : 1;
    const novaNarudzba = new Narudzba(newOrderId, naruceniProizvodi);

    narudzbe.push(novaNarudzba);

    return res.status(201).json({
        message: "Narudzba uspješno dodana",
        narudzba: {
            id: novaNarudzba.id,
            ukupnaCijena: novaNarudzba.ukupnaCijena,
            naruceniProizvodi: novaNarudzba.naruceniProizvodi,
        },
    });
});

export default router;
