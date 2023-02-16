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