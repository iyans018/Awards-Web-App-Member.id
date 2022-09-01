const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AwardsSchema = new Schema({
    name: String,
    poin: Number,
    type: { 
        type: String,
        enum: ["Vouchers", "Products", "Giftcard"],
    },
    imageUrl: String
}, { timestamps: true });

const Awards = mongoose.model("Awards", AwardsSchema);

module.exports = Awards