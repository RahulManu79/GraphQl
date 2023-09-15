const mongoose = require("mongoose")

const connectDB = async () => {
    const con = await mongoose.connect(process.env.MONGO_URL)

    console.log(`MongoDB Connected: ${con.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB