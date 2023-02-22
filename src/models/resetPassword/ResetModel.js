import ResetSchema from "./ResetSchema.js";

export const createOtp = (obj) => {
    return ResetSchema(obj).save()
}

export const updateOtp = (filter, obj) => {
    return ResetSchema.findOneAndUpdate(filter, obj, { new: true });
};


