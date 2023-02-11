import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: false },
    birthday: { type: String, required: false },
    gender: { type: String, required: false },
    aboutMe: { type: String, required: false },
});

export default mongoose.model('User', userSchema);