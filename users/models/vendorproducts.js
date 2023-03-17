import mongoose from "mongoose";

const vendorproduct = mongoose.Schema({
    vendorId: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    
});

export default mongoose.model("vendorproduct", vendorproduct);
