import express from "express"

const router = express.Router();

const pizze = [
    { id: 1, naziv: "Margerita", cijena: 7.00 },
    { id: 2, naziv: "Capricciosa", cijena: 9.00 },
    { id: 3, naziv: "Šunka sir", cijena: 8.00 },
    { id: 4, naziv: "Vegetariana", cijena: 12.00 },
];

/*
router.get("/", (req, res) => {
    res.send("Hello, world!");
});
*/
router.get("/", (req, res) => {
    res.json(pizze);
});

router.get("/:id", (req, res) => {
    const id_pizza = parseInt(req.params.id);
    const pizza = pizze.find(p => p.id === id_pizza);

    if (!pizza) {
        return res.status(404).json({ message: "Nema pizze s tim ID-jem" });
    }
    res.json(pizza);
});

router.put('/:id', (req, res) => {

    let id_pizza_req = req.params.id;
    let tijelo_zahtjeva = req.body;

    if (isNaN(id_pizza_req)) {
        // provjeravamo je li id_pizza "Not a Number"
            return res.status(400).json({ message: 'Proslijedili ste parametar id koji nije broj!' });
        
    }
    console.log('id_pizza', id_pizza);

    let index = pizze.findIndex(pizza => pizza.id == id_pizza_req )
    
    pizze[index] = tijelo_zahtjeva;

    console.log('pizze array', pizze);

    return res.json({message: 'Ažurirano', azurirani_podatak: tijelo_zahtjeva});
});

router.patch('/:id', (req, res) => {
    let id_pizza_req = req.params.id;
    let tijelo_zahtjeva = req.body;

    if (isNaN(id_pizza_req)) {
        return res.json({ message: 'Proslijedili ste parametar id koji nije broj!' });
    }

    let index = pizze.findIndex(pizza => pizza.id == id_pizza_req);
    if (index === -1) {
        return res.json({ message: 'Pizza not found' });
    }

    let kljucevi_objekta = Object.keys(tijelo_zahtjeva);
    for (let kljuc of kljucevi_objekta) {
        if (pizze[index][kljuc] !== undefined) {
            pizze[index][kljuc] = tijelo_zahtjeva[kljuc];
        }
    }

    console.log('Updated array', pizze);

    return res.json({ message: 'Ažurirano', azurirani_podatak: pizze[index] });
});

export default router;
export { pizze };
