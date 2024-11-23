import express from "express";
import {
  create,
  getAll,
  login,
  getOneUser,
  deleteUser,
  deleteUsers,
  updateUser,
  protectedRoute,
} from "../controllers/userController.js";
import { authToken } from "../middleware/authMiddleware.js";
process.loadEnvFile();

const router = express.Router();

router.get("/get-users", getAll);
router.get("/get-one", getOneUser);
router.get("auth");
router.post("/create-user", create);
router.post("/login", login);
router.delete("/delete-user/:id", deleteUser);
router.delete("/delete-all", deleteUsers);
router.patch("/update-user/:id", updateUser);

router.get("/protected", authToken, protectedRoute);

export default router;
