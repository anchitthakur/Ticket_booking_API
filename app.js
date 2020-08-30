const express = require('express');
const app = express();
require('dotenv').config();
require('./DBManager/connectToDB')();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use('/Ticket', require('./Routers/ticketRouter'));
app.use('/User', require('./Routers/userRouter'));


app.get('/', async (req, res) => {
    res.send({message: 'Welcome to Ticket booking system'})
})

app.all('*',(req,res)=>{
    res.send({message: 'Route doesn\'t exist'})
})

module.exports = app;