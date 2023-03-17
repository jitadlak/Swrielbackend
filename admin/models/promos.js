import mongoose from "mongoose";

const promosSchema = mongoose.Schema({
    promoname: {
        type: String,
        required: true,
    },
    percentoff: {
        type: String,
        required: true,
    },
    promocode: {
        type: String,
        required: true,
    },
    validtill: {
        type: String,
        required: true,
    },
    promodescription: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String,
        required: false,
    },
    promoImg: {
        type: String,
        required: true,
    },
    users: {
        type: Array,
        default: []
    },
    id: { type: String },
    time: { type: Date, default: Date.now }
});

export default mongoose.model("promos", promosSchema);