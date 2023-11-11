import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    birthday: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    aboutMe: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    latLong: {
        type: {},
        required: false
    },
});

export default mongoose.model("User", userSchema);