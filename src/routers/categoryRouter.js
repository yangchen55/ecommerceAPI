import express from "express";
import {
  createNewCategory,
  deleteCat,
  readCategories,
  updateCategory,
} from "../models/category/CategoryModel.js";
import slugify from "slugify";
import { updatCatValidation } from "../middlewares/joiMiddleware.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getSelectedProduct } from "../models/product/ProductMode.js";

const router = express.Router();

// create category
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name.length && typeof name === "string") {
      const obj = {
        name,
        slug: slugify(name, {
          lower: true,
          trim: true,
        }),
      };

      const result = await createNewCategory(obj);

      if (result?._id) {
        return res.json({
          status: "success",
          message: "New Category has been created",
          result,
        });
      }
    }
    res.json({
      status: "error",
      message: "Unable to create the category, Please try again later.",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "This category has been alredy created, change the name and try again later";
    }
    next(error);
  }
});

// read category
router.get("/", async (req, res, next) => {
  try {
    const cats = await readCategories();

    res.json({
      status: "success",
      message: "Here is the cat lists",
      cats,
    });
  } catch (error) {
    next(error);
  }
});

// update category
router.put("/", updatCatValidation, async (req, res, next) => {
  try {
    const result = await updateCategory(req.body);

    if (result?._id) {
      return res.json({
        status: "success",
        message: "The Category has been updated!",
        result,
      });
    }
    res.json({
      status: "error",
      message: "Unanble to upda the category, please try gain later",
    });
  } catch (error) {
    next(error);
  }
});

// delete category
router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;

  //get all the product that as parentCat === _id
  const prodList = await getSelectedProduct({ parentCat: _id });
  if (prodList.length) {
    const names = prodList.map(({ name }) => name).toString();
    return res.json({
      status: "error",
      message:
        "Pelase re assign category for the following product before you can delete this category: " +
        names,
    });
  }

  const result = await deleteCat(_id);

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
});

export default router;
