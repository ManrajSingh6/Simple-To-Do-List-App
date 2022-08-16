const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connecting + creating a new DB
mongoose.connect("mongodb://localhost:27017/listDB");

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check data entry, you must enter a task name!"]
    }
});
const Item = mongoose.model("Item", itemsSchema);

app.get("/", function(req, res){

    // Finding all items in the Items collection
    Item.find({}, function(err, itemsReturned){

        // Rendering EJS design on front-end
        res.render('design', {dateString: "Today", itemsArray: itemsReturned});    
    })

}); 

app.post("/", function(req, res){

    // Getting input item, saving to database, displaying on front-end
    let inputItem = req.body.newItem;
    const newItem = new Item({
        name: inputItem
    });
    newItem.save();
    res.redirect("/");
})


app.post("/delete", function(req, res){

    // Getting checked item id, removing it from database, displaying it from front-end
    const itemId = req.body.checkBox;
    Item.findByIdAndRemove({_id: itemId}, function(err){
        if (err) {console.log("Error deleting item.");}
        else {console.log("Successfully deleted item.");}
    });
    res.redirect("/");

});

app.listen(port, function(){
    console.log("Connected to port: " + port);
});