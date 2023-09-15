const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    discription: {
        type: String,
    },
    status: {
        type: String,
        enum:["Not Started","In Progress","completed"]
    },
    clientId: {
        type:mongoose.Types.ObjectId,
        ref:"Client"
    }

}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema)