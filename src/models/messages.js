import mongoose from "mongoose"

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema(
    {
        user: {type: String, required: [true, "Username is required"]},
        message: {type: String, required: [true, "Message is required"]}
    }
)

export const messagesModel = mongoose.model(messagesCollection, messagesSchema);
