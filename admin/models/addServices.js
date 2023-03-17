import mongoose from "mongoose";

const servicesSchema = mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
    },
    serviceImage: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },


    id: { type: String },

});

export default mongoose.model("services", servicesSchema);