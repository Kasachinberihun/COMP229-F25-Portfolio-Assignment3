import jwt from "jsonwebtoken";

// ==========================================
// REQUIRE AUTH (verify token from cookie/header)
// ==========================================
export const requireAuth = (req, res, next) => {
  try {
    let token = null;

    // 1. Check cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2. Check Authorization header
    if (!token && req.headers.authorization) {
      const auth = req.headers.authorization;
      if (auth.startsWith("Bearer ")) {
        token = auth.slice(7);
      }
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ==========================================
// REQUIRE ADMIN ROLE
// (still available if you want to use it later)
// ==========================================
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};

// ==========================================
// OPTIONAL: Require specific roles
// ==========================================
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  if (!req.user.role || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

// ==========================================
// DEFAULT EXPORT: requireAuth (for compatibility)
// ==========================================
export default requireAuth;

