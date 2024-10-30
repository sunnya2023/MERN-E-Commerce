import mongoose from "mongoose";

const connectDB = async () => {
  // mongoose
  //   .connect(process.env.MONGODB_URL, {
  //     dbName: "e-comm",
  //   })
  //   .then(() => {
  //     console.log("MongoDB is connected");
  //   })
  //   .catch((err) => {
  //     console.log("err:", err);
  //     process.exit(1);
  //   });
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "E-commerce",
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("DB_error", error);
    process.exit(1);
  }
};

export default connectDB;
