import mongoose from "mongoose";

const vendorrequestsSchema = mongoose.Schema({
   
    amount: {
        type: Number,
        required: true,
    },
    vendor: {
        type: String,
        required: true
    },
    id: { type: String },
    
    approved: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model("vendorrrequest", vendorrequestsSchema);