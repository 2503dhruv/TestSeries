import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import testRoutes from './routes/testRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5100;

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api', testRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/results', resultRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Backend API is running 🚀');
});

// MongoDB connection
connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
