const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect(`${process.env.MONGOOSE_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => console.log('mongoDB connected'))
        .catch(() => console.error);
}

