const router = require('express')
    .Router();

const Ticket = require('../DBManager/Models/ticket.model');
const User = require('../DBManager/Models/user.model');
const mongoose = require('mongoose');


/**
 * @apiDefine TicketSuccess
 * @apiSuccess {Date} timings Time for the ticket
 * @apiSuccess {String} _id MongoDB generate _id
 * @apiSuccess {String} user _id of the user who booked the ticket
 * @apiSuccess {Date} createdAt Timestamp of the creation of the ticket
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *    "message": "Success",
 *    "ticket": {
 *      "_id": "5f4b71c7ec53302d826a6dc6",
 *      "timings": "2020-11-17T16:30:28.000Z",
 *      "user": "5f4b71c7c152df3a1aaea1d0"
 *      "createdAt": "2020-08-30T09:30:47.807Z"
 *      }
 *    }
 */

router.route('/')
    /**
     * @api {post} /ticket Create a new ticket
     * @apiGroup Ticket
     * @apiUse TicketSuccess
     * @apiParam {Date} timings Time for the ticket to be booked
     * @apiParam {String} fullName Name of the user
     * @apiParam {String} phone Phone number of the user
     * @apiExample Example usage:
     *    endpoint: http://localhost:9000/ticket
     *    body: {
     *        "timings": "2020-11-17T16:30:28.000Z",
     *        "fullName": "Anchit Thakur",
     *        "phone": "123-456-7890"
     *    }
     * @apiErrorExample {json} Error Types
     *    HTTP/1.1 500 {"message": "Something went wrong"}
     *    HTTP/1.1 422 {"message": "Invalid input"}
     *    HTTP/1.1 412 {"message": "Max ticket count exceeded"}
     */
    .post(async (req, res) => {
        try {
            const {timings, fullName, phone} = req.body;
            if (!timings || !fullName || !phone || isNaN(Date.parse(timings)) || !(/\d{3}-\d{3}-\d{4}/.test(phone))) {
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
    /**
     * @api {patch} /ticket Change the timings of an existing ticket
     * @apiGroup Ticket
     * @apiUse TicketSuccess
     * @apiParam {String} ticketId _id of the ticket to be changed
     * @apiParam {Date} timings new timings requested
     * @apiExample Example usage:
     *    endpoint: http://localhost:9000/ticket
     *    body: {
     *        "timings": "2020-11-17T16:30:28.000Z",
     *        "ticketId": "4d5c719fc95147c7213fa720"
     *    }
     * @apiErrorExample {json} Error Types
     *    HTTP/1.1 500 {"message": "Something went wrong"}
     *    HTTP/1.1 422 {"message": "Invalid input"}
     *    HTTP/1.1 412 {"message": "Max ticket count exceeded"}
     */
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
    /**
     * @api {get} /ticket Fetch all tickets for a particular timing
     * @apiGroup Ticket
     * @apiSuccess {Object[]} tickets Fetched tickets
     * @apiSuccess {Date} ticket.timings Time for the ticket
     * @apiSuccess {String} ticket._id MongoDB generate _id
     * @apiSuccess {Date} ticket.createdAt Timestamp of the creation of the ticket
     * @apiSuccess {Object} ticket.user User who booked the ticket
     * @apiSuccess {String} ticket.user.firstName User's first name
     * @apiSuccess {String} ticket.user.lastName User's last name
     * @apiSuccess {String} ticket.user.phone User's phone number
     * @apiParam {Date} timings timings for the tickets
     * @apiExample Example usage:
     *    endpoint: http://localhost:9000/ticket
     *    query: {
     *        "timings": "2020-11-17T16:30:28.000Z",
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *    "message": "Success",
     *    "tickets": [{
     *      "_id": "5f4b71c7ec53302d826a6dc6",
     *      "timings": "2020-11-17T16:30:28.000Z",
     *      "user": {
     *        "timings": "2020-11-17T16:30:28.000Z",
     *        "fullName": "Anchit Thakur",
     *        "phone": "123-456-7890"
     *      }
     *      "createdAt": "2020-08-30T09:30:47.807Z"
     *    }]
     *    }
     * @apiErrorExample {json} Error Types
     *    HTTP/1.1 500 {"message": "Something went wrong"}
     *    HTTP/1.1 422 {"message": "Invalid input"}
     *    HTTP/1.1 404 {"message": "No tickets found"}
     */
    .get(async (req, res) => {
        try {
            const {timings} = req.query;
            if (!timings || isNaN(Date.parse(`${timings}`))) {
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
    /**
     * @api {delete} /ticket Delete a ticket by it's _id
     * @apiGroup Ticket
     * @apiParam {String} ticketId _id of the ticket to be changed
     * @apiExample Example usage:
     *    endpoint: http://localhost:9000/ticket
     *    body: {
     *        "ticketId": "4d5c719fc95147c7213fa720"
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK {"message": "Success"}
     * @apiErrorExample {json} Error Types
     *    HTTP/1.1 500 {"message": "Something went wrong"}
     *    HTTP/1.1 422 {"message": "Invalid input"}
     *    HTTP/1.1 404 {"message": "Ticket not found / Already delete"}
     */
    .delete(async (req, res) => {
        try {
            const {ticketId} = req.body;
            if (!ticketId) {
                res.status(422).send({message: 'Invalid inputs'})
            } else {
                const _id = mongoose.Types.ObjectId(ticketId);
                const response = await Ticket.deleteOne({_id});
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