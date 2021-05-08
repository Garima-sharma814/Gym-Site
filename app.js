// IMPORTING MODULES
const express = require('express');  
const path = require('path');  
const fs= require('fs');  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/garima', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = 80;
const hostname = '127.0.0.1';

app.use('/static', express.static('static')); // bg is a static file this is why we included this 
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug'); // Set the template engine as pug 
app.set('views', path.join(__dirname, 'views')); // Setting the directory where pug is 

//CREATING CONNECTION WITH MONGOOSE
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("sucessfully connected to mongooose");
});

// Defining the Schema
const gymSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more: String
  });

// Making the model
const gym = mongoose.model('redgym', gymSchema);


// ALL GET REQUESTS HERE
app.get('/', (req, res) => {
    res.status(200);
    console.log("this is get request");
    res.render('home.pug');
    // res.send("this is the home page ")
});

app.get('/views/contact.pug', (req, res) => {
    res.status(200);
    console.log("this is get request");
    res.render('contact.pug');
    // res.send("this is the home page ")
});

// ALL POST REQUESTS HERE 
app.post('/contact', (req, res) => {
    var gymData = new gym (req.body);
    gymData.save().then(()=>{
        console.log("Data saved");  
        res.send("daTA is saved")
    }).catch(()=>{
        res.status(404);
        console.log("Data not saved");
    });
});

app.listen(port, () => {
    console.log(`The server is running at http://${hostname}:${port}/`);
});
