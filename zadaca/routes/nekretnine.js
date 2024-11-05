import express from "express";

const router = express.Router();

let nekretnine = [
    { id: 1, naziv: "stan", opis: "malo se raspada, ali će valjat", cijena: 350000, lokacija: "Grimalda", broj_soba: 1, povrsina: 340 },
    { id: 2, naziv: "kuća", opis: "ilegalno izgrađena", cijena: 23000, lokacija: "Boljun", broj_soba: 8, povrsina: 3560 },
    { id: 3, naziv: "kuća", opis: "jako je mića", cijena: 350, lokacija: "Mošćenička Draga", broj_soba: 1, povrsina: 19 },
];

router.get("/", (req, res) => {
    res.status(200).json(nekretnine);
});

router.get("/:id", (req, res) => {
    let id_nekretnina = parseInt(req.params.id);
    let nekretnina = nekretnine.find(p => p.id === id_nekretnina);

    if (!nekretnina) {
        return res.status(404).json({ message: "Nema nekretnine s tim ID-jem" });
    }

    if (isNaN(id_nekretnina)) {
        return res.status(400).json({ message: "Ni broj" });
    }

    res.json(nekretnina);
});

router.post("/add", (req, res) => {
    let nekretnina = req.body;
    let kljucevi = Object.keys(nekretnina);

    if (!kljucevi.includes("naziv") || !kljucevi.includes("cijena") || 
        !kljucevi.includes("opis") || !kljucevi.includes("lokacija") || 
        !kljucevi.includes("povrsina") || !kljucevi.includes("broj_soba")) {
        return res.status(400).json("Fale ti podaci");
    }

    if (nekretnina.cijena < 0) {
        return res.status(400).json("Cijena mora bit pozitivna");
    }

    if (nekretnina.povrsina < 0) {
        return res.status(400).json("Povrsina mora bit pozitivna");
    }

    if (nekretnina.broj_soba < 0) {
        return res.status(400).json("Broj soba mora bit pozitivan");
    }

    for (let postoji of nekretnine) {
        if (postoji.naziv === nekretnina.naziv && 
            postoji.opis === nekretnina.opis && 
            postoji.cijena === nekretnina.cijena) {
            return res.status(400).json("Već je tu");
        }
    }

    nekretnine.push(nekretnina);
    return res.status(200).json(nekretnine); 
});

router.put("/update/:id", (req, res) => {
    let id_nekretnina = req.params.id;
    let t = req.body;

    if (isNaN(id_nekretnina)) {
        return res.status(400).json("Unesi broj");
    }

    let found = nekretnine.find(n => n.id == id_nekretnina);

    if (!found) {
        return res.status(404).json("Ni je");
    }

    nekretnine[found] = t;

    return res.status(200).json("Uppdate done");
});

router.delete('/:id', (req, res) => {
    let id_nekretnina_req = req.params.id;

    if (isNaN(id_nekretnina_req)) {
        return res.json({ message: 'Proslijedili ste parametar id koji nije broj!' });
    }

    let index = nekretnine.findIndex(nekretnina => nekretnina.id == id_nekretnina_req);
    if (index === -1) {
        return res.status(404).json('Nisan naša nekretninu');
    } else {
        nekretnine.splice(index, 1);
        return res.json({ message: 'Obrisano' });
    }
});

router.patch('/:id', (req, res) => {
    let id_nekretnina_req = req.params.id;
    let tijelo_zahtjeva = req.body;

    if (isNaN(id_nekretnina_req)) {
        return res.json({ message: 'Proslijedili ste parametar id koji nije broj!' });
    }

    let index = nekretnine.findIndex(nekretnina => nekretnina.id == id_nekretnina_req);
    if (index === -1) {
        return res.json({ message: 'Nema' });
    }

    let kljucevi_objekta = Object.keys(tijelo_zahtjeva);
    for (let kljuc of kljucevi_objekta) {
        if (nekretnine[index][kljuc] !== undefined) {
            nekretnine[index][kljuc] = tijelo_zahtjeva[kljuc];
        }
    }

    console.log('Updated array', nekretnine);

    return res.json({ message: 'Ažurirano', azurirani_podatak: nekretnine[index] });
});

export default router;
export {nekretnine};
