import express from "express";
import {
  create,
  getAll,
  login,
  getOneUser,
  deleteUser,
  deleteUsers,
  updateUser,
} from "../controllers/userController.js";
import userValidator from "../middleware/userValidator.js";
import validateFields from "../middleware/validateFields.js";

const router = express.Router();

router.get("/get-users", getAll);
router.get("/get-one", getOneUser);
router.post("/create-user", create);
router.post("/login", login);
router.delete("/delete-user/:id", deleteUser);
router.delete("/delete-all", deleteUsers);
router.patch("/update-user/:id", updateUser);

export default router;
