const mongoose = require("mongoose");

const config = require("config");

const URI = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
        ,useFindAndModify: false});
        console.log('connection has established...')
    }
    catch (err)
    {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;