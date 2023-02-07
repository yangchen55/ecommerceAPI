import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive"

    },
    address: {
        type: String,
        default: ""

    },
    emailVerficationCode: {
        type: String,
        default: ""

    },
    isEmailVerfified: {
        type: Boolean,
        default: false,
    },
    confirmPassword: {
        type: String,
        default: ""

    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: 1
    },
    fname: {
        type: String,
        required: true,

    },
    lname: {
        type: String,
        required: true,
        default: "",
    },
    password: {
        type: String,
        required: true,
        default: "",
    },
    phoneno:
    {
        type: String,
        default: "",
    },

},
    {
        timestamps: true
    })

export default mongoose.model("Admin_user", AdminSchema)