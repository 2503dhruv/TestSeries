import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import testRoutes from './routes/testRoutes';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5100;

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api', testRoutes);

// MongoDB Connection
connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});