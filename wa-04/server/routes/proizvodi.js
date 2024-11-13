import express from 'express';
const router = express.Router();

function Proizvod(id, naziv, cijena, velicine = [], boje = []) {
  this.id = id;
  this.naziv = naziv;
  this.cijena = cijena;
  this.velicine = Array.isArray(velicine) ? velicine : [velicine];
  this.boje = Array.isArray(boje) ? boje : [boje];
}

const proizvodi = [
  new Proizvod(1, 'Obična crna majica', 100, ['XS', 'S', 'M', 'L'], ['crna', 'bijela']),
  new Proizvod(2, "Levi's 501 traperice", 110, ['S', 'M', 'L'], ['plava', 'crna']),
  new Proizvod(3, 'Zimska kapa', 40, ['onesize'], ['siva', 'crvena']),
  new Proizvod(4, 'Čarape Adidas', 20, ['34-36', '37-39', '40-42'], ['bijela', 'crna']),
  new Proizvod(5, 'Tenisice Nike', 200, ['38', '39', '40', '41', '42', '43', '44', '45'], ['bijela', 'crvena', 'plava']),
];

router.get('/', (req, res) => {
  try {
    res.status(200).json(proizvodi);
  } catch (error) {
    res.status(500).send('Greška na serveru.');
  }
});

router.get('/:id', (req, res) => {
  const id_req = parseInt(req.params.id, 10);

  if (isNaN(id_req)) {
    res.status(400).send('ID mora biti broj.');
    return;
  }

  const proizvod = proizvodi.find((proizvod) => proizvod.id === id_req);

  if (proizvod) {
    res.status(200).json(proizvod);
  } else {
    res.status(404).send('Proizvod nije pronađen.');
  }
});

export default router;
