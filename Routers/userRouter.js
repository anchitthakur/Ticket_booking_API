const express = require('express');
const router = express.Router();

const Ticket = require('../DBManager/Models/ticket.model');
const mongoose = require('mongoose');


router
    .route('/')
    /**
     * @api {get} /user Fetch User by ticket ID
     * @apiGroup User
     *
     * @apiSuccess {String} firstName User's first name
     * @apiSuccess {String} lastName User's last name
     * @apiSuccess {String} phone User's phone number
     * @apiSuccess {String} _id MongoDB generate _id
     * @apiParam {String} query Ticket ID associated with the user
     * @apiExample Example usage:
     *    endpoint: http://localhost:9000/user
     *    query: {
     *        "ticketId: "4d5c719fc95147c7213fa720"
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *    "message": "Success",
     *    "user": {
     *      "_id": "5f4a719fc95143c7813ff709",
     *      "firstName": "Anchit",
     *      "lastName": "Thakur"
     *      "phone": "123-456-7890"
     *      }
     *    }
     * @apiErrorExample {json} Error Types
     *    HTTP/1.1 500 {"message": "Something went wrong"}
     *    HTTP/1.1 422 {"message": "Invalid input"}
     *    HTTP/1.1 404 {"message": "User not found"}
     */
    .get(async (req, res) => {
        try {
            const {ticketId} = req.query;
            if (!ticketId) {
                res.status(422).send({message: 'Invalid inputs'})
            }
            const _id = mongoose.Types.ObjectId(ticketId);
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