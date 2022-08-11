const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = [];
app.get("/", function(req, res){
    let currentDate = new Date();
    let option = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    let day = currentDate.toLocaleDateString("en-US", option);
    res.render('design', {dateString: day, itemsArray: items});

}); 

app.post("/", function(req, res){
    let inputItem = req.body.newItem;
    items.push(inputItem);
    res.redirect("/");
})

app.listen(port, function(){
    console.log("Connected to port: " + port);
});