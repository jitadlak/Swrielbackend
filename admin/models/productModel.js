import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },


    id: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("products", productSchema);