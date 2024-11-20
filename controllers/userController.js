import User from "../models/User.js";

async function create(req, res) {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    return res.status(200).json({ message: "user create successfully" });
  } catch (error) {
    console.log(error);
  }
}

export default {
  create: create,
};
