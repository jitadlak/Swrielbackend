import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    id: { type: String },
    time: { type: Date, default: Date.now }
});

export default mongoose.model("admin", adminSchema);