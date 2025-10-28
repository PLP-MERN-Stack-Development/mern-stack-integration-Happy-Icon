const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  featuredImage: { type: String }, // store file path or URL
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  author: { type: String },
  published: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
