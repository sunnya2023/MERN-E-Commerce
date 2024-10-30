import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "가입된 이메일이 아닙니다" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.status(200).json({ success: true, token });
    } else {
      res
        .status(400)
        .json({ success: false, message: "비밀번호를 확인해주세요." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  try {
    const { name, email, password } = req.body;
    // checking user already exists or not
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, error: "이미 가입된 이메일입니다" });
    }
    // validating email & PW
    if (!pwRegex.test(password)) {
      return res.status(400).json({
        error: "비밀번호는 영문/숫자/특수문자 포함 8자이상 입력해주세요",
      });
    }
    // hashing PW
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPW,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const adminLogin = async (req, res) => {};
