import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected Successfully ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
