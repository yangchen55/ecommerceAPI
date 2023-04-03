import ProductSchema from "./ProductSchema.js";

export const createProduct = (obj) => {
  return ProductSchema(obj).save();
};

export const getAllProducts = () => {
  return ProductSchema.find();
};

export const getSingleProduct = (filter) => {
  return ProductSchema.findOne(filter);
};

export const getSelectedProduct = (filter) => {
  return ProductSchema.find(filter);
};
export const geProductById = (_id) => {
  return ProductSchema.findById(_id);
};

export const updateProduct = (_id, obj) => {
  return ProductSchema.findByIdAndUpdate(_id, obj, { new: true });
};

export const deleteSignleProduct = (filter) => {
  return ProductSchema.findOneAndDelete(filter, obj);
};

//idsArg must be an array of _id
export const deleteProducts = (idsArg) => {
  return ProductSchema.deleteMany({
    _id: { $in: idsArg },
  });
};
