import PenpalModal from "../models/penpal.js";

export const fetchPenpals = async (require, response) => {
    const { id } = require.params;

    try {
        const userPenpals = await PenpalModal.find({ $or: [{ penpal_1: id }, { penpal_2: id }] });
        response.status(200).json(userPenpals);

    } catch (error) {

        response.status(404).json({ message: error })
    }
}

export const createPenpal = async (require, response) => {
    const penpal = require.body;

    const newPenpal = new PenpalModal(penpal);

    try {
        await newPenpal.save();
        response.status(201).json(newPenpal);

    } catch (error) {

        response.status(409).json({ message: error.message });
    }
}

export const sendLetter = async (require, response) => {
    const letter = require.body;

    try {
        const newLetter = await PenpalModal.findByIdAndUpdate(
            letter.idPenpal, { $push: { letters: { $each: [letter.message], $position: 0 } } }, { new: true });

        response.status(201).json(newLetter);

    } catch (error) {

        response.status(500).json({ message: "Something went wrong" });
    }
}