
const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Welcome to my Hotel !! How i can help you ? we have list of menu....');
})

const personRoutes =  require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');



app.use('/person',personRoutes);
app.use('/menu',menuRoutes);



app.listen(3000,()=>{
    console.log("Listening to the port 3000");
});