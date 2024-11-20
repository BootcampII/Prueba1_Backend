import express from "express";
import userController from "../controllers/userController.js";
import userValidator from "../middleware/userValidator.js";
import validateFields from "../middleware/validateFields.js";

const router = express.Router();

router.post("/api/users", userValidator, validateFields, userController.create);

export default router;
