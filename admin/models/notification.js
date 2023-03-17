import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    notificationTitle: {
        type: String,
        required: true,
    },
    notificationDescription: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    toId: {
        type: String,
        required: true,
    },


    id: { type: String },
    createdAt: { type: Date, default: Date.now },
    // serviceData: {
    //     type: Object,
    //     required: true
    // }
});

export default mongoose.model("notification", notificationSchema);