import { v2 as cloudinary } from "cloudinary";
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
      size,
      color,
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
    // console.log(images);

    //cloudinary에 업로드
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    console.log("이미지 주소:", imagesUrl);

    res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// list product
export const listProduct = async (req, res) => {};

// remove product
export const removeProduct = async (req, res) => {};

// single proudct info
export const singleProduct = async (req, res) => {};
