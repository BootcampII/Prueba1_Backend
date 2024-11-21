import express from "express";
import { create, getAll } from "../controllers/userController.js";
import userValidator from "../middleware/userValidator.js";
import validateFields from "../middleware/validateFields.js";

const router = express.Router();

router.post("/create-user", userValidator, validateFields, create);
router.get("/get-users", getAll);

export default router;
