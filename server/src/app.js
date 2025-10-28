require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const postsRoutes = require('./config/routes/posts');
const categoriesRoutes = require('./config/routes/categories');
const errorHandler = require('./config/models/middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
