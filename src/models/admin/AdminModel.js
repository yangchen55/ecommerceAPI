import AdminSchema from "./adminSchema.js";
export const createNewAdmin = (obj) => {
    return AdminSchema(obj).save();
}