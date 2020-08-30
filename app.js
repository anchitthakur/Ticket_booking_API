const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));


app.get('/', async (req, res) => {
    res.send({message: 'Welcome to ticket booking system'})
})

app.all('*',(req,res)=>{
    res.send({message: 'Route doesn\'t exist'})
})

module.exports = app;