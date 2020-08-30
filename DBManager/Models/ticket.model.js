const mongoose = require('mongoose');

const {Schema} = mongoose;

const TicketSchema = Schema({
    timings: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true,
    },
    createdAt: {type: Date, default: Date.now, required: true}
});

TicketSchema.index({timings: 1}, {expireAfterSeconds: 28800});


module.exports = mongoose.model('ticket', TicketSchema);