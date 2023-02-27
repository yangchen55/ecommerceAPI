import AdminSchema from "./AdminSchema.js";

export const createNewAdmin = (obj) => {
  return AdminSchema(obj).save();
};

// @filter and @obj must be an objects
//@filter is the serch criteria
//@obj is the content that will be updated in the db
export const updateAdmin = (filter, obj) => {
  return AdminSchema.findOneAndUpdate(filter, obj, { new: true });
};

// find a user, @filter must be an obj
export const findUser = (filter) => {
  return AdminSchema.findOne(filter);
};
