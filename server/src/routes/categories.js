import { Router } from "express";
import { getCategories, createCategory } from "../controllers/category.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", getCategories);
router.post("/", protect, createCategory);

export default router;
