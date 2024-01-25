const mongoose = require("mongoose");
const colors = require("colors");

// Function for MongoDB database connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgWhite.black);
    } catch (error) {
        console.log("DB Error".bgCyan);
    }
};

module.exports = connectDb;
