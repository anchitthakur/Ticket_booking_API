const router = require('express')
    .Router();

const Ticket = require('../DBManager/Models/ticket.model');
const User = require('../DBManager/Models/user.model');
const mongoose = require('mongoose');

router.route('/')
    .post(async (req, res) => {
        try {
            const {timings, fullName, phone} = req.body;
            if (!timings || !fullName || !phone || isNaN(Date.parse(timings)) || !(/\d{3}-\d{3}-\d{4}/.test(phone))) {
                console.log(req.body)
                res.status(422).ssend({message: 'Invalid inputs'})
            } else {
                const [firstName, lastName] = fullName.split(' ');
                const numTicketsAtTime = await Ticket.countDocuments({timings: Date.parse(timings)});
                if (numTicketsAtTime < 10) {
                    const user = await User.findOneAndUpdate({firstName, lastName, phone: phone}, {}, {
                        upsert: true,
                        new: true
                    })
                    const ticket = await Ticket.create({timings: Date.parse(timings), user: user._id})
                    res.status(200).send({message: 'Success',ticket})
                } else {
                    res.status(412).send({message: 'Max ticket count exceeded'})
                }
            }
        } catch (e) {
            console.log(e)
            res.status(500).send({"message": "Something went wrong"})
        }
    })
    .patch(async (req, res) => {
        try {
            const {ticketId, timings} = req.body;
            if (!timings || !ticketId || isNaN(Date.parse(timings))) {
                res.status(422).send({message: 'Invalid inputs'})
            } else {
                const numTicketsAtTime = await Ticket.countDocuments({timings: Date.parse(timings)});
                if (numTicketsAtTime < 10) {
                    const _id = mongoose.Types.ObjectId(ticketId);
                    const ticket = await Ticket.findOneAndUpdate({_id}, {timings: Date.parse(timings)}, {new: true});
                    res.status(201).send({message: "Success", ticket})
                } else {
                    res.send({message: 'Max ticket count exceeded'})
                }
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({"message": "Something went wrong"});
        }
    })
    .get(async (req, res) => {
        try {
            const {timings} = req.query;
            if (!timings || isNaN(Date.parse(`${timings}`))) {
                console.log(timings)
                res.status(422).send({message: 'Invalid inputs'})
            } else {
                const tickets = await Ticket.find({timings: Date.parse(`${timings}`)}).populate('user');
                if (tickets.length === 0)
                    res.status(404).send({message: 'No tickets found'})
                else
                    res.send({message: 'Success', tickets})

            }
        } catch (e) {
            console.log(e)
            res.status(500).send({"message": "Something went wrong"})
        }
    })
    .delete(async (req, res) => {
        try {
            const {ticketId} = req.body;
            if (!ticketId) {
                res.status(422).send({message: 'Invalid inputs'})
            } else {
                const _id = mongoose.Types.ObjectId(ticketId);
                const response = await Ticket.deleteOne({_id});
                console.log(response);
                if (response.deletedCount === 1)
                    res.send({message: 'Success'})
                else
                    res.status(404).send({message: 'Ticket not found / Already deleted'})
            }
        } catch (e) {
            console.log(e)
            res.status(500).send({"message": "Something went wrong"})
        }
    })

module.exports = router;