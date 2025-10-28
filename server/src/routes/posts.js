import { Router } from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../controllers/post.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { body } from "express-validator";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post(
  "/",
  protect,
  upload.single("image"),
  [body("title").notEmpty(), body("content").notEmpty()],
  createPost
);
router.put("/:id", protect, upload.single("image"), updatePost);
router.delete("/:id", protect, deletePost);

export default router;
