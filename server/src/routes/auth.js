import { Router } from "express";
import { register, login } from "../controllers/auth.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/register",
  [body("username").notEmpty(), body("password").isLength({ min: 6 })],
  register
);
router.post("/login", login);

export default router;
