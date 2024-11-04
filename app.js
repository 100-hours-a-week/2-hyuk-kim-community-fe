//index.js
import express from "express";
let app = express();

app.use('/', express.static('./'));

app.get("/", function(req, res){
    res.sendfile("./html/LoginPage.html");
});

app.listen(3000, function(){
    console.log("App is running on port 3000");
});
