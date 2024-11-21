import User from "../models/User.js";

export async function createUser(data) {
  try {
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export async function getUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error.message}`);
  }
}
