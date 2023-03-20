import mongoose from "mongoose";

const vendorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    storename: {
        type: String,
        required: true,
    },
    storecontactno: {
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
    id:
    {
        type: String
    },
    storeaddress: {
        type: String,
        required: true
    },
    websitelink: {
        type: String,
        required: false
    },
    membership: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "Vendor"
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

export default mongoose.model("vendor", vendorSchema);
