import mongoose from "mongoose";

const serviceproviderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    id: { type: String },
    address: {
        type: String,
        required: true
    },
    IDDocument: {
        type: String,
        required: false
    },
    membership: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "ServiceProvider"
    },
    serviceId: {
        type: String,
        required: true
    },
    walletBalance: {
        type: Number,
        default: 0,
    },
    device_token: {
        type: String,
        required: false
    }
});

export default mongoose.model("serviceprovider", serviceproviderSchema);