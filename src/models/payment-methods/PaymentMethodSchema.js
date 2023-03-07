import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("payment_method", paymentMethodSchema);
