const express = require("express")

let app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
})

const port = 3000;
app.listen(port, (error)=>{

    if(error){
        console.log("ERROR!")
    } else {

    console.log(`Slušam na portu ${port}`);
    }
});



