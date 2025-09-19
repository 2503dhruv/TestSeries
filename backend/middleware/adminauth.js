import dotenv from "dotenv";
dotenv.config();

const adminAuth = (req, res, next) => {
  const key = req.headers["x-admin-key"];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ message: "Unauthorized: Invalid Admin Key" });
  }
  next();
};

export default adminAuth;
