const mongoose = require("mongoose")

const UrlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Url", UrlSchema)