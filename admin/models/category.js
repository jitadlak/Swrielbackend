import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String,
        required: true,
    },


    id: { type: String },
    createdAt: { type: Date, default: Date.now },
    serviceData: {
        type: Object,
        required: true
    }
});

export default mongoose.model("category", categorySchema);