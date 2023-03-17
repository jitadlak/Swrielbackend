import mongoose from "mongoose";

const bankaccountsSchema = mongoose.Schema({
   
    accountNo: {
        type: Number,
        required: true,
    },
    bankName: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    id: { type: String },
    
    ifsc: {
        type: String,
        default: true,
    },
    userid: {
        type: String,
        default: true,
    }
});

export default mongoose.model("bankaccounts", bankaccountsSchema);