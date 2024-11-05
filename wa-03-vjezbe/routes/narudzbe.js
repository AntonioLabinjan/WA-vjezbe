import express from "express"
import { pizze } from './pizze.js';



const router = express.Router();

let narudzbe = []; 

router.post("/narudzba", (req, res) => {
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

        const pizzaPostoji = pizze.find(p => p.naziv === stavka.pizza);
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



router.put('/:id', (req, res) => {

    let id_narudzba_req = req.params.id;
    let tijelo_zahtjeva = req.body;

    if (isNaN(id_narudzba_req)) {
        return res.status(400).json({ message: 'Proslijedili ste parametar id koji nije broj!' });
    }
    console.log('id_narudzba', id_narudzba);

    let index = narudzbe.findIndex(narudzba => narudzba.id == id_narudzba_req )
    
    narudzbe[index] = tijelo_zahtjeva;

    console.log('narudzbe array', narudzbe);

    return res.json({message: 'Ažurirano', azurirani_podatak: tijelo_zahtjeva});
});

router.patch('/:id', (req, res) => {
    let id_narudzba_req = req.params.id;
    let tijelo_zahtjeva = req.body;

    if (isNaN(id_narudzba_req)) {
        return res.json({ message: 'Proslijedili ste parametar id koji nije broj!' });
    }

    let index = narudzbe.findIndex(narudzba => narudzba.id == id_narudzba_req);
    if (index === -1) {
        return res.json({ message: 'Narudzba not found' });
    }

    let kljucevi_objekta = Object.keys(tijelo_zahtjeva);
    for (let kljuc of kljucevi_objekta) {
        if (narudzbe[index][kljuc] !== undefined) {
            narudzbe[index][kljuc] = tijelo_zahtjeva[kljuc];
        }
    }

    console.log('Updated array', narudzbe);

    return res.json({ message: 'Ažurirano', azurirani_podatak: narudzbe[index] });
});


router.get("/:id", (req, res) => {
    const id_narudzba = req.params.id;
    
    if (isNaN(id_narudzba)) {
        return res.status(400).json({ message: 'Proslijedili ste parametar id koji nije broj!' });
    }

    const narudzba = narudzbe.find(p => p.id === id_narudzba);

    if (!narudzba) {
        return res.status(404).json({ message: "Nema narudzbe s tim ID-jem" });
    }

    res.status(200).json(narudzba);
});


router.delete('/:id', (req, res) => {
    let id_narudzba_req = req.params.id;

    if (isNaN(id_narudzba_req)) {
        return res.json({ message: 'Proslijedili ste parametar id koji nije broj!' });
    }


    let index = narudzbe.find(narudzba => narudzba.id == id_narudzba_req);
    if (index === -1) {
        return res.json({ message: 'Nisan naša narudžbu' });
    }


    const obrisano = narudzbe.splice(index, 1);

   // console.log('', pizze);

    return res.json({ message: 'Narudzba deleted', obrisani_podatak: obrisano[0] });
});
export default router
