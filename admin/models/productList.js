import mongoose from "mongoose";

const productListSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productTitle: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    id: { type: String },
    createdAt: { type: Date, default: Date.now },
    productSubcategory: {
        type: Object,
        required: true
    },
    productSellingPrice: {
        type: String,
        required: false
    },
    productCompany: {
        type: String,
        required: true
    },
    productSubcategoryId: {
        type: String,
        required: true
    },
    AddedBy: {
        type: String,
        required: false
    }


});

export default mongoose.model("ProductList", productListSchema);