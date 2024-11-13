class Proizvod {
    constructor(id, naziv, cijena, velicine, opis, karakteristike, slike) {
        this.id = id;
        this.naziv = naziv;
        this.cijena = cijena;
        this.velicine = velicine;
        this.opis = opis;
        this.karakteristike = karakteristike;
        this.slike = slike;
    }
}


    const proizvodi = [
    new Proizvod(1, 'Obična crna majica', 80, ['XS', 'S', 'M', 'L'], 'Obična je', ['zapaljiva'], ['https://www.bing.com/images/search?view=detailV2&ccid=vAUUyUWJ&id=1A5E9A684D70F348C0BA5F4FE765F46C3F93DC7A&thid=OIP.vAUUyUWJwIWPATfBY-rIiwHaJk&mediaurl=https%3a%2f%2fimages.squarespace-cdn.com%2fcontent%2fv1%2f5c7e4843797f74590fa26ad8%2f1551886580105-TT57AINOL06SMMMFLLXG%2fke17ZwdGBToddI8pDm48kDcfM4wjscSdsbp7HqcZX0IUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2kxJ_yMf_wxGZStbloE0XMQLlMRHxq5anmPOMNXBqPywKMshLAGzx4R3EDFOm1kBS%2fShirt_Solo.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.bc0514c94589c0858f0137c163eac88b%3frik%3detyTP2z0ZedPXw%26pid%3dImgRaw%26r%3d0&exph=1060&expw=820&q=black+shirt&simid=608038306285109042&FORM=IRPRST&ck=EAF966635B8A63686BDD26277379E7F4&selectedIndex=5&itb=1']), // dodajte opis ipolje poveznica na slike
    new Proizvod(2, "Levi's 501 traperice", 110, ['S', 'M', 'L'], 'Isto ko 500, samo malo skuplje', ['fake su'], ['https://www.bing.com/images/search?view=detailV2&ccid=aY2TG%2bFY&id=1D68DDD659938150536240D29837CA02621EF802&thid=OIP.aY2TG-FY8etrKJLC24WTswHaE3&mediaurl=https%3a%2f%2farc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com%2fpublic%2f44CFHKSNSBSIOBRYKBV72X7PEQ.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.698d931be158f1eb6b2892c2db8593b3%3frik%3dAvgeYgLKN5jSQA%26pid%3dImgRaw%26r%3d0&exph=841&expw=1280&q=levis+jeans&simid=608039324152899126&FORM=IRPRST&ck=B608D3CA93D931AE15C806655492B697&selectedIndex=49&itb=0']),
    new Proizvod(3, 'Zimska kapa', 40, 'onesize', 'Nosi je po liti, budi divljak',['made in Zimbabwe'] ['https://th.bing.com/th/id/OIP.OvX02ThNVL_4T545GBqRkgHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7']),
    new Proizvod(4, 'Čarape Adidas', 20, ['34-36', '37-39', '40-42'], 'I dalje smrde ako ih ne opereš', ['različite'] ['https://th.bing.com/th/id/R.2cee15fef8451e1c81821ec20b533617?rik=4Hztv9vpesq1Jg&pid=ImgRaw&r=09']),
    new Proizvod(5, 'Tenisice Nike', 200, ['38', '39', '40', '41', '42', '43', '44', '45'], 'Imamo samo livu', ['ne pitaj di je desna'], ['https://th.bing.com/th/id/OIP.7SeMY3g9G_4NuDeEHBz8DgHaE3?w=375&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7'])
    ];
   
export { proizvodi, Proizvod };

