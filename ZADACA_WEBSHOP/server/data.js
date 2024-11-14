class Proizvod {
    constructor(id, naziv, cijena, velicine, opis, dostupne_boje, karakteristike, slike) {
        this.id = id;
        this.naziv = naziv;
        this.cijena = cijena;
        this.velicine = velicine;
        this.opis = opis;
        this.dostupne_boje = dostupne_boje;
        this.karakteristike = karakteristike;
        this.slike = slike;
    }
}


    const proizvodi = [
    new Proizvod(1, 'Obična crna majica', 80, ['XS', 'S', 'M', 'L'], 'Obična je',['žuta', 'crna', 'zelena'], 'zapaljiva', ['https://th.bing.com/th/id/OIP.XcS9AFYGWsROl0Hc3o5JRAHaEc?w=290&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7']), // dodajte opis ipolje poveznica na slike
    new Proizvod(2, 'Levis 501 traperice', 110, ['S', 'M', 'L'], 'Isto ko 500, samo malo skuplje',['žuta', 'plava'], 'fake su', ['https://th.bing.com/th/id/R.d1d6c5655d7730ac308d2a91b6643a3b?rik=gdbYBPLEZ%2bBq8A&pid=ImgRaw&r=0']),
    new Proizvod(3, 'Zimska kapa', 40, ['onesize'], 'Nosi je po liti, budi divljak',['žuta', 'crvena'],'made in Zimbabwe', ['https://th.bing.com/th/id/OIP.buzazGBdj5-yTa6uSqFKPwHaHa?rs=1&pid=ImgDetMain']),
    new Proizvod(4, 'Čarape Adidas', 20, ['34-36', '37-39', '40-42'], 'I dalje smrde ako ih ne opereš',['žuta', 'plava'], 'različite', ['https://th.bing.com/th?id=OIF.thzBlGbjZl3Z5%2ffIst0V0w&w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7']),
    new Proizvod(5, 'Tenisice Nike', 200, ['38', '39', '40', '41', '42', '43', '44', '45'], 'Imamo samo livu', ['žuta'],'ne pitaj di je liva', ['https://th.bing.com/th/id/OIP.aEVetVQ6Ql7_Thqhp2jiaAHaHa?rs=1&pid=ImgDetMain'])
    ];
   
export { proizvodi, Proizvod };

