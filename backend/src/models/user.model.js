import mongoose, { Schema } from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    avatar: {
      type: String,
      require: true,
    },
    watchHistory: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Video",
        },
      ],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  console.log(this.password);
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) throw new ApiError(400, "password not found");
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAcessToken = function () {
  return Jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

//callback is not used bcoz in callback we don't have reference of this
export const User = mongoose.model("User", userSchema);
