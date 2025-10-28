require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const postsRoutes = require('./routes/posts');
const categoriesRoutes = require('./routes/categories');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json()); // body parser
app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

// routes
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);

// error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
