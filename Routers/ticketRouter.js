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

module.exports = router;