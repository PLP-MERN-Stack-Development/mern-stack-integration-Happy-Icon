import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("author", "username")
    .sort({ createdAt: -1 });
  res.json(comments);
};

export const createComment = async (req, res) => {
  const { content } = req.body;
  const comment = await Comment.create({
    content,
    post: req.params.postId,
    author: req.user,
  });
  const populated = await Comment.findById(comment._id).populate("author", "username");
  res.status(201).json(populated);
};

export const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return res.status(404).json({ msg: "Not found" });
  if (comment.author.toString() !== req.user) return res.status(403).json({ msg: "Unauthorized" });
  await comment.deleteOne();
  res.json({ msg: "Deleted" });
};
