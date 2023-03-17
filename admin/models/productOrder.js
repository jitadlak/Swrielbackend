import mongoose from "mongoose";

const productorderschema = mongoose.Schema({
    user: {
        type: Object,
        required: true,
    },
    order: {
        type: Array,
        required: true,
    },
    TotalAmount: {
        type: Number,
        required: true,
    },
    DeliveryFee: {
        type: Number,
        required: true,
    },
    TotalQuantity: {
        type: Number,
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
    Phone: {
        type: Number,
        required: false,
    },
    zipcode: {
        type: String,
        required: false,
    },
    latitude: {
        type: String,
        required: false,
    },
    longitude: {
        type: String,
        required: false,
    },
    paymentId: {
        type: String,
        required: true,
    },
    deliveryStatus: {
        type: String,
        required: true,
    },
    deliveryNote: {
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
    promocodeApplied: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    },

    id: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("productorders", productorderschema);
