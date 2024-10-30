import expres from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
// App Config
const app = expres();
const port = process.env.PORT || 4000;
dotenv.config();
connectDB();
connectCloudinary();

// middlewares
app.use(expres.json());
app.use(cors());

// api endpoint
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
