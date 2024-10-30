import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    Comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: false,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
      unique: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    color: {
      type: Array,
      required: true,
    },
    bestseller: {
      type: Boolean,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
