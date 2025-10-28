import { Router } from "express";
import { getComments, createComment, deleteComment } from "../controllers/comment.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/:postId", getComments);
router.post("/:postId", protect, createComment);
router.delete("/:commentId", protect, deleteComment);

export default router;
