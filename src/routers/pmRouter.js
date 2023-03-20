import express from "express";
const router = express.Router();
import {
  createNewPaymentMetnod,
  readPaymentMetnods,
  deletePaymentMetnod,
  updatePaymentMetnods,
} from "../models/payment-methods/PaymentMethodModel.js";
import {
  newPMValidation,
  updatePMValidation,
} from "../middlewares/joiMiddleware.js";

router.post("/", newPMValidation, async (req, res, next) => {
  try {
    const { _id } = await createNewPaymentMetnod(req.body);

    _id
      ? res.json({
          status: "success",
          message: "Payment method has been added",
        })
      : res.json({
          status: "error",
          message: "Error!, unable to add payment method, pleas try agin later",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const result = await readPaymentMetnods();
    res.json({
      status: "success",
      message: "Payment methods list",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/", updatePMValidation, async (req, res, next) => {
  try {
    const { _id } = await updatePaymentMetnods(req.body);
    _id
      ? res.json({
          status: "success",
          message: "Payment method has been added",
        })
      : res.json({
          status: "error",
          message: "Error!, unable to add payment method, pleas try agin later",
        });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (_id) {
      const result = await deletePaymentMetnod(_id);
      if (result?._id) {
        return res.json({
          status: "success",
          message: "Payment method has been deleted successfully!",
        });
      }
    }

    res.json({
      status: "error",
      message: "Unable to delete the payment method. Invalid request.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
