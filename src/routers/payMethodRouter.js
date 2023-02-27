import express from "express";
import { createNewPayMethod, deletePaymentMethod, readPayment, updatePayment } from "../models/paymentMethod/PayMethodModel.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { paymentMethod, description } = req.body
        console.log(paymentMethod)
        const obj = {
            name: paymentMethod,
            description: description

        }
        const result = await createNewPayMethod(obj)
        if (result?._id) {
            return res.json({
                status: "success",
                message: "New payment has been created",
                result,
            });
        }
        res.json({
            status: "error",
            message: "Unable to  add payment type, Please try again later.",
        });


    } catch (error) {
        next(error)

    }
})


// get payment details in the table

router.get("/", async (req, res, next) => {

    try {
        const payments = await readPayment();
        console.log("iam from get router", payments)
        res.json({
            status: "success",
            message: "here are all payment list from router",
            payments,
        })
    } catch (error) {
        next(error)

    }

})


// delete paymentMethod 

router.delete("/:id", async (req, res, next) => {
    console.log(req.params)


    const { id } = req.params;
    console.log(id)
    const result = await deletePaymentMethod(id);

    if (result?._id) {
        return res.json({
            status: "success",
            message: "The category has been deleted successfully",
        });
    }
    try {
        res.json({
            status: "error",
            message: "Unable to delete the category, try again later",
        });
    } catch (error) {
        next(error);
    }

})

router.put("/", async (req, res, next) => {
    try {
        const result = await updatePayment(req.body)
        console.log(req.body)
        if (result?._id) {
            return res.json({
                status: "success",
                message: "The Category has been updated!",
                result,
            });
        }
        res.json({
            status: "error",
            message: "Unanble to update the category, please try gain later",
        });

    } catch (error) {
        next(error);

    }

})

export default router;