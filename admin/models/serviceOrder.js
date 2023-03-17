import mongoose from "mongoose";

const serviceorderSchema = mongoose.Schema({
    userId: {
        type: Object,
        required: true,
    },
    serviceSubcategoryId: {
        type: Array,
        required: true,
    },
    serviceDate: {
        type: String,
        required: true,
    },
    serviceTime: {
        type: String,
        required: true,
    },
    serviceSlot: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: false,
    },

    addressLine2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zipcode: {
        type: String,
        required: false,
    },
    paymentId: {
        type: String,
        required: true,
    },
    serviceStatus: {
        type: String,
        required: false,
    },
    serviceAmount: {
        type: String,
        required: false,
    },
    assignTo: {
        type: String,
        required: false,
    },
    serviceProviderId: {
        type: String,
        required: false
    },
    latitude: {
        type: String,
        required: false
    },
    longitude: {
        type: String,
        required: false
    },
    userid: {
        type: String,
        required: false
    },



    id: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("serviceorder", serviceorderSchema);
