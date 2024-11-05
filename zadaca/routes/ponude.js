import express from "express";
import { nekretnine } from "./nekretnine.js"; 

const router = express.Router();

let ponude = [];

router.post("/ponuda/:id", (req, res) => {
    let id_nekretnina = parseInt(req.params.id);
    let ponuda = req.body;

    let nekretnina = nekretnine.find(n => n.id === id_nekretnina);
    if (!nekretnina) {
        return res.status(404).json({ message: "Nema nekretnine s tim ID-jem" });
    }

    const elementi = ["id_ponuda", "id_nekretnina", "ponuditelj", "cijena", "opis"];
    let kljucevi = Object.keys(ponuda);

    for (let element of elementi) {
        if (!kljucevi.includes(element)) {
            return res.status(400).json(`Fale ti podaci: ${element}`);
        }
    }

    if (ponuda.cijena < 0) {
        return res.status(400).json("Cijena mora bit pozitivna");
    }

    ponuda.id_nekretnina = id_nekretnina;
    ponude.push(ponuda);

    return res.status(200).json({
        message: "Ponuda je uspješno dodana",
        ponuda
    });
});

export default router;
