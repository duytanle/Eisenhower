import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
