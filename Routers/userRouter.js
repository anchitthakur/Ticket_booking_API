const express = require('express');
const router = express.Router();

const Ticket = require('../DBManager/Models/ticket.model');
const mongoose = require('mongoose');


router
    .route('/')
    .get(async (req, res) => {
        try {
            const {ticketId} = req.query;
            if (!ticketId) {
                res.status(422).send({message: 'Invalid inputs'})
            }
            const _id = mongoose.Types.ObjectId(ticketId);
            console.log(_id)
            const response = await Ticket.findOne({_id}, {user: 1}).lean().populate('user');
            if (response)
                res.send({message: 'Success', user: response.user})
            else
                res.status(404).send({message: 'User not found'})
        } catch (e) {
            console.log(e)
            res.status(500).send({"message": "Something went wrong"})
        }
    })

module.exports = router;