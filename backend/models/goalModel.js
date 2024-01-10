import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    text: {
        type: String,
        require: [true, 'Add a text value']
    }
}, {
    timestamps: true
})

export const Goal = mongoose.model('Goal', goalSchema)