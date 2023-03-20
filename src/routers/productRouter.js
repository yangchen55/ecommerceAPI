import express from "express";
import { newProductValidation } from "../middlewares/joiMiddleware.js";
import { createProduct } from "../models/product/ProductMode.js";
import slugify from "slugify";

const router = express.Router();
import multer from "multer";
const imgFolderPath = "public/img/products"
// create storage where to store the files  or upload it to temporary folder.
// memory = short term 
const storage = multer.diskStorage({
  distination: (req, file, cb) => {
    let error = null;
    // validation file check 
    // if error is nulll , where you want to upload pic 
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    let error = null;
    const fullFileName = Date.now() + "_" + file.originalname;
    cb(error, fullFileName)

  },
})
const upload = multer({ storage })



router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json({
      status: "success",
      message: "product lsit",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", upload.array('images'), newProductValidation, async (req, res, next) => {
  try {
    const formData = req.body;
    const images = req.files;
    console.log(req.body);




    req.body.slug = slugify(req.body.name, { trim: true, lower: true });
    const result = await createProduct(req.body);
    //get form data
    //get images

    if (result?._id) {
      return res.json({
        status: "success",
        message: "The product has been added!",
      });
    }

    res.json({
      status: "error",
      message: "Error adding new product, contact administration",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "There is already another product has same sluge, Pelase change the produt name and try agnain later.";
    }
    next(error);
  }
});

export default router;
