import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requied: [true, "Username is required"],
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      minLength: 5,
      maxLength: 255,
      match: [/\S+@\S+\.\S+/, "Please filla valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
