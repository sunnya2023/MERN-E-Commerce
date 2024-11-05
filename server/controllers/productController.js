import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/productModel.js";
// add product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      subCategory,
      sizes,
      colors,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );
    // console.log(
    //   name,
    //   description,
    //   price,
    //   originalPrice,
    //   category,
    //   subCategory,
    //   size,
    //   color,
    //   bestseller
    // );
    // console.log("이미지 주소:", image1, image2, image3, image4);
    console.log(images);

    //cloudinary에 업로드
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          public_id: `E-commerce/${item.filename
            .split(".")
            .slice(0, -1)
            .join("")}_${new Date().getTime()}`,
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    // console.log("이미지 주소:", imagesUrl);

    const productData = {
      name,
      description,
      price,
      originalPrice,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
      bestseller: bestseller === "true" ? true : false,
      images: imagesUrl,
    };
    console.log(productData);

    const newProduct = new ProductModel(productData);
    await newProduct.save();
    res.status(200).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// list product
export const listProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});

    res.status(200).json({ seccess: "true", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// remove product
export const removeProduct = async (req, res) => {
  try {
    // await ProductModel.findOneAndDelete(req.body.id);
    //res.json({ success: true, message: "Product Removed" });

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (product.images && product.images.length > 0) {
      await Promise.all(
        product.images.map(async (imgUrl) => {
          // URL에서 public_id 추출
          const publicId = imgUrl
            .split("/")
            .slice(-2)
            .join("/")
            .replace(/\.(png|jpg|jpeg|gif)$/, "");
          // console.log(`public_id: ${publicId}`);
          await cloudinary.uploader.destroy(publicId);
        })
      );
    }

    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// single proudct info
export const singleProduct = async (req, res) => {};
