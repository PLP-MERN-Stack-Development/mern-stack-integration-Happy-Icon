import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

  const query = {};
  if (req.query.category) query.category = req.query.category;
  if (req.query.search) query.title = { $regex: req.query.search, $options: "i" };

  const total = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .populate("category", "name")
    .populate("author", "username")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({ posts, pagination: { page, pages: Math.ceil(total / limit), total } });
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("category", "name")
    .populate("author", "username");
  if (!post) return res.status(404).json({ msg: "Post not found" });
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const featuredImage = req.file?.path;

  const post = await Post.create({
    title,
    content,
    category,
    author: req.user,
    featuredImage,
  });
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: "Not found" });
  if (post.author.toString() !== req.user) return res.status(403).json({ msg: "Unauthorized" });

  const updates = req.body;
  if (req.file) updates.featuredImage = req.file.path;

  const updated = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(updated);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: "Not found" });
  if (post.author.toString() !== req.user) return res.status(403).json({ msg: "Unauthorized" });

  await post.deleteOne();
  res.json({ msg: "Deleted" });
};
