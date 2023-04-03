import express from "express";
import {
  editProductValidation,
  newProductValidation,
} from "../middlewares/joiMiddleware.js";
import {
  createProduct,
  geProductById,
  getAllProducts,
  updateProduct,
  deleteProducts,
} from "../models/product/ProductMode.js";
import slugify from "slugify";
const router = express.Router();
import multer from "multer";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const imgFolderPath = "public/img/products";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    // validation error check
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    let error = null;
    const fullFileName = Date.now() + "_" + file.originalname;
    cb(error, fullFileName);
  },
});

const upload = multer({ storage });

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const products = _id ? await geProductById(_id) : await getAllProducts();
    res.json({
      status: "success",
      message: "product lsit",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      //form data => req.body

      const newImages = req.files;

      // image => req.files
      const images = newImages.map((item) => item.path);
      req.body.images = images;
      req.body.mainImage = images[0];
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
  }
);

router.put(
  "/",
  upload.array("newImages", 5),
  editProductValidation,
  async (req, res, next) => {
    try {
      // get the procudt id
      const { _id, ...rest } = req.body;
      // set the new image path
      // remove the deleted item
      const imgToDeletArg = rest?.imgToDelete?.split(",") || [];

      // imgToDeletArg.map((item) => fs.unlinkSync(path.join(__dirname, item)));
      //conert string to array
      rest.images = rest?.images?.split(",");

      const oldImages =
        rest?.images?.filter((item) => !imgToDeletArg?.includes(item)) || [];

      const newImages = req.files;

      // image => req.files
      const newImagesPath = newImages.map((item) => item.path);
      rest.images = [...oldImages, ...newImagesPath];

      console.log(_id, rest);

      const result = await updateProduct(_id, rest);
      //get form data
      //get images

      if (result?._id) {
        return res.json({
          status: "success",
          message: "The product has been Updated!",
        });
      }

      res.json({
        status: "error",
        message: "Error updating new product, contact administration",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;

    const { deletedCount } = await deleteProducts(ids);

    deletedCount
      ? res.json({
          status: "success",
          message: "Selected products has been deleted.",
        })
      : res.json({
          status: "erro",
          message: "Unable to delete the products, please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
