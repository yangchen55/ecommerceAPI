import PaymentMethodSchema from "./PaymentMethodSchema.js";

//Create paymentMetnods
export const createNewPaymentMetnod = (obj) => {
  return PaymentMethodSchema(obj).save();
};

//Read paymentMetnods
export const readPaymentMetnods = () => {
  return PaymentMethodSchema.find();
};

//update paymentMetnods
export const updatePaymentMetnods = ({ _id, ...rest }) => {
  return PaymentMethodSchema.findByIdAndUpdate(_id, rest);
};

//delete paymentMetnods
export const deletePaymentMetnod = (_id) => {
  return PaymentMethodSchema.findByIdAndDelete(_id);
};
