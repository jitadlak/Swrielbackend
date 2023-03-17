import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyLogo: {
        type: String,
        required: true,
    },
    product: {
        type: Array,
        default: []
    },


    id: { type: String },
    createdAt: { type: Date, default: Date.now },
    // serviceData: {
    //     type: Object,
    //     required: true
    // }
});

export default mongoose.model("companies", companySchema);