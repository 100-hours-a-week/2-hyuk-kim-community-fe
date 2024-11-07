//index.js
import express from "express";
import path from 'path';
import open from 'open';
let app = express();

const PORT = 3000;

app.use('/', express.static('./'));

app.get("/LoginPage.html", function(req, res){
    // res.sendfile("./html/LoginPage.html");
    res.sendFile(path.join(__dirname, 'html', 'LoginPage.html'));
});

app.listen(3000, async () =>{
    console.log("App is running on port 3000");
    // await open(`http://localhost:${PORT}/html/LoginPage.html`);
});
