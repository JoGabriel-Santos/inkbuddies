import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ObjectId } from "mongodb";

import UserModal from "../../models/user.js";

const secret = "secret";

export const getUser = async (require, response) => {
    const { id } = require.params;

    try {
        const userMessage = await UserModal.find({ _id: new ObjectId(id) });
        response.status(200).json(userMessage);

    } catch (error) {

        response.status(404).json({ message: error });
    }
}

export const getUsers = async (require, response) => {
    try {
        const usersMessage = await UserModal.find();
        response.status(200).json(usersMessage);

    } catch (error) {

        response.status(404).json({ message: error });
    }
}

export const updateUser = async (require, response) => {
    const user = require.body;

    try {
        const updatedUser = await UserModal.findByIdAndUpdate(require.userId, user, { new: true });

        const token = jwt.sign({ name: updatedUser.name, id: updatedUser._id }, secret, { expiresIn: '1h' });

        response.status(200).json({ result: updatedUser, token });

    } catch (error) {

        response.status(500).json({ message: "Something went wrong" });
    }
}

export const signin = async (require, response) => {
    const { name, password } = require.body;

    try {
        const user = await UserModal.findOne({ name });

        if (!user)
            return response.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect)
            return response.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ name: user.name, id: user._id }, secret, { expiresIn: '1h' });

        response.status(200).json({ result: user, token });

    } catch (error) {

        response.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async (require, response) => {
    const { name, email, password } = require.body;

    try {
        const user = await UserModal.findOne({ email });

        if (user)
            return response.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });

        response.status(201).json({ result, token });

    } catch (error) {

        response.status(500).json({ message: "Something went wrong" });
    }
};