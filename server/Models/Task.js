import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            ref: "Account",
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        type: {
            type: String,
        },
        timeCompleted: {
            type: Date,
        },
        statusCompleted: {
            type: Boolean,
            default: false,
        },
        removeTrash: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
