const express = require("express")

let app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    //public\about.html
  });

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/public/about.html");
})

app.get("/users", (req, res) => {
    const users = [
        {id: 1, ime: "Pino", prezime: "NekoPrezime" } ,
        {id: 2, ime: "Franko", prezime: "IstoPrezime"},
        {id: 3, ime: "Mario", prezime: "Battifiaca"}


    ]
    res.json(users);
})

const port = 3000;
app.listen(port, (error)=>{

    if(error){
        console.log("ERROR!")
    } else {

    console.log(`Slušam na portu ${port}`);
    }
});



