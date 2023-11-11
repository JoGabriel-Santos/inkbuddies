import mongoose from "mongoose";

const CONNECTION_URL = "mongodb+srv://Inkbuddies:r6OYcVlDP4XpSsWe@inkbuddies.cd6gp3d.mongodb.net/Inkbuddies?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }
};

export default connectDB;