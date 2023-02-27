import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", true);

    const con = await mongoose.connect(process.env.MONGO_CLIENT);
    con?.connections
      ? console.log("DB connected")
      : console.log("unable to connect mongo");
  } catch (error) {
    console.log(error);
  }
};
