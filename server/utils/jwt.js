import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,      // ✅ matches model + auth.controller
      role: user.role,      // ✅ include role for requireAdmin
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d", // ✅ use your .env setting if available
    }
  );
};

export default generateToken;

