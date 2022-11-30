import mongoose from "mongoose";

const connectDB = async function () {
    try {
        const uri = `mongodb://localhost:27017/eisenhower`;

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connect Database Successfully!");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
