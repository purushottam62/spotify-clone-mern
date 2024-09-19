import { response } from "express";
import { upload } from "../middilewares/multer.middileware.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Jwt from "jsonwebtoken";
const generateAcessTokenAndRefreshToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accessToken = user.generateAcessToken();
    const refreshToken = user.generateRefreshToken();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      400,
      "something went wrong while generating access token and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  /*[fullName, username, email, password].map((field) => {
    if (field.trim() === "") {
      throw new ApiError(400, `${field} is required`);
    }
  });*/
  // it is wrong code bcoz field will be fullname and not the value of full name so it is logically wrong
  const fields = {
    fullName,
    username,
    email,
    password,
  };
  Object.entries(fields).forEach(([key, value]) => {
    if (value.trim() === "") {
      throw new ApiError(400, `${key} is required`);
    }
  });
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  const avatarLocalFilePath = req.files?.avatar[0]?.path;
  if (!avatarLocalFilePath) {
    throw new ApiError(400, "avatar is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalFilePath);
  if (!avatar) {
    console.log("failed to load avatar");
    throw new ApiError(400, "avatar file is required to send on cloudinary");
  }
  //   const avatarLocalFilePath = req.files?.avatar[0]?.path;
  //   if (!avatarLocalFilePath) {
  //     throw new ApiError(400, "avatar is required");
  //   }
  //   const coverLocalFilePath = req.files?.cover[0]?.path;
  //   if (!avatarLocalFilePath) {
  //     throw new ApiError(400, "avatar is required");
  //   }
  //   const cover = uploadOnCloudinary(avatarLocalFilePath);
  //   if (!avatar) {
  //     throw new ApiError(400, "avatar file is required to send on cloudinary");
  //   }
  //i have returned response.url so here avatar is url
  const user = await User.create({
    fullName,
    password,
    avatar,
    username: username.toLowerCase(),
    email,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "user registered successfully")
    // email: this.email,
  );
});
const loginUser = asyncHandler(async (req, res) => {
  //take username and password
  //check if user exist
  //validate it
  //if user exist then return token
  //if user dont exist then return error
  const { email, password } = req.body;
  console.log(email, password);
  if (!email) throw new ApiError(400, "email is required");
  if (!password) throw new ApiError(400, "password is required");
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) throw new ApiError(404, "user don't exists");
  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) throw new ApiError(401, "incorrect password");
  //   const user = await User.findById(user._id).select("-password -refreshToken");
  //   if (!user)
  //     throw new ApiError(500, "something went wrong while logging in user");
  const { accessToken, refreshToken } = await generateAcessTokenAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
});
const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user loggedout successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorised request");
  }
  try {
    const decodedToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!decodedToken)
      throw new ApiError(500, "something went wrong while verification");
    const user = await User.findById(decodedToken?._id);
    if (!user) throw new ApiError(401, "invalid refresh token");
    if (incomingRefreshToken !== user?.refreshToken)
      throw new ApiError(401, "refresh token is used or expired");
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newrefreshToken } =
      await generateAcessTokenAndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid refresh token");
  }
});
const changeCurrentPassword = asyncHandler(async (res, req) => {
  const { oldPassword, newPassword } = req.body;
  const user = User.findById(req.user._id);
  if (!user) throw new ApiError(401, "invalid user");
  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) throw new ApiError(401, "old password is incorrect");
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"));
});
const getCurrentUser = asyncHandler(async (res, req) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});
const changeProfilePic = asyncHandler(async () => {
  const avatarLocalFilePath = req.file?.path;
  if (!avatarLocalFilePath) throw new ApiError(400, "avatar is required");
  const avatar = await uploadOnCloudinary(avatarLocalFilePath);
  if (!avatar)
    throw new ApiError(
      400,
      "something went wrong while uploading file on cloudinary"
    );
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar,
      },
    },
    { new: true }
  ).select("-password");
  return response
    .status(200)
    .json(new ApiResponse(200, user, "cover image updated successfully"));
});
const getWatchHistory = asyncHandler(async (res, req) => {});
export {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  changeProfilePic,
  getWatchHistory,
};
