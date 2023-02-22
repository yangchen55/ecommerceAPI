import mongoose from "mongoose";

const ResetSchema = new mongoose.Schema({
    associate: {
        type: String,

    },
    token: {
        type: String,


    }


},
    {
        timestamps: true
    })

export default mongoose.model("Reset-password", ResetSchema)

