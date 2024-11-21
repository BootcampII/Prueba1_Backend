import { createUser } from "../services/userServices.js";
import { getUsers } from "../services/userServices.js";

export async function create(req, res) {
  try {
    const newUser = await createUser(req.body);
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in userController.create:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
export async function getAll(req, res) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
