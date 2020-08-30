const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'First name required']
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
});

UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
}).set(function (v) {
    const [firstName, lastName] = v.split(' ');
    this.set({firstName, lastName});
});

module.exports = mongoose.model('user', UserSchema);