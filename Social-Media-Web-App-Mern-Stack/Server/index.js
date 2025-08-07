import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';

const app = express();
dotenv.config();

// Serve static files
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// MongoDB Connection
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server listening on port ${process.env.PORT}`)
  );
})
.catch((error) => {
  console.log("❌ MongoDB connection error:", error.message);
});

// Routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
