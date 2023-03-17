import mongoose from "mongoose";

const serviceproviderrequestsSchema = mongoose.Schema({
   
    amount: {
        type: Number,
        required: true,
    },
    serviceprovider: {
        type: String,
        required: true
    },
    id: { type: String },
    
    approved: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model("serviceproviderrequest", serviceproviderrequestsSchema);