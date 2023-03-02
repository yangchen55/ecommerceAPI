import PayMethodSchema from "./PayMethodSchema.js"

export const createNewPayMethod = (obj) => {
    return PayMethodSchema(obj).save();
}

export const readPayment = (filter) => {
    return PayMethodSchema.find(filter);
}

export const deletePaymentMethod = (_id) => {
    return PayMethodSchema.findByIdAndDelete(_id);
}

export const updatePayment = ({ _id, ...rest }) => {
    return PayMethodSchema.findByIdAndUpdate(_id, rest, { new: true })
}