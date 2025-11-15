import mongoose from "mongoose";

import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
  {
    name: {                           // ✅ use "name" to match auth.controller + Signup.jsx
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

// Compare plain password with hashed password
userSchema.methods.matchPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;


