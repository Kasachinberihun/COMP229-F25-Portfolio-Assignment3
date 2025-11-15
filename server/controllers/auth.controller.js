import User from "../models/user.js";
import generateToken from "../utils/jwt.js";

// ✅ SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;   // 👈 use "name", not "username"

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // create user (User model should hash password in a pre-save hook)
    const user = await User.create({ name, email, password });

    // create token
    const token = generateToken(user);

    // optional: set cookie as well as returning token
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // set true if using HTTPS in production
      })
      .status(201)
      .json({
        message: "User created",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ SIGNIN
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // check password (matchPassword defined on the User model)
    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // create token
    const token = generateToken(user);

    // send token in cookie + JSON
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ SIGNOUT
export const signout = async (_req, res) => {
  // clear JWT cookie (even if you also store token in localStorage on frontend)
  res.clearCookie("token").json({ message: "Signed out" });
};


