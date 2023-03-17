
import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema({
    subcatagoryname: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    id: { type: String },
    createdAt: { type: Date, default: Date.now },
    categoryData: {
        type: Object,
        required: true
    },

});

export default mongoose.model("subcategories", subcategorySchema);