import mongoose from "mongoose";

const penpalSchema = mongoose.Schema({
    penpal_1: {
        type: String
    },
    penpal_2: {
        type: String
    },
    letters: {
        type: [Object],
        default: []
    }
});

export default mongoose.model("Penpal", penpalSchema);