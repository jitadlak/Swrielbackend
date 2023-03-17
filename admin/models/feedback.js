import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    id: { type: String },
    query: { type: String, required: true, }
});

export default mongoose.model("feedback", feedbackSchema);