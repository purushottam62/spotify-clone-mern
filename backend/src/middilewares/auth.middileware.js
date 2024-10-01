import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken?.trim() ||
//       req.header("Authorization")?.replace("Bearer", "")?.trim();
//     if (!token) throw new ApiError(401, "Unauthorized request");
//     const decodedToken = await jwt.verify(
//       token,
//       process.env.ACCESS_TOKEN_SECRET
//     );
//     if (!decodedToken) throw new ApiError(400, "token mismatched");
//     const user = await User.findById(decodedToken.id);
//     // console.log(decodedToken, "decode token id is ", decodedToken.id);
//     if (!user) throw new ApiError(401, "Unauthorized request");
//     req.user = user;
//     // console.log("req.user in verify jwt function is ", req.user);

//     next();
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid access token");
//   }
// });
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken?.trim() ||
      req.header("Authorization")?.replace("Bearer ", "")?.trim(); // Note the space after "Bearer"

    console.log("Token:", token); // Log the token for debugging

    if (!token) throw new ApiError(401, "Unauthorized request");

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!decodedToken) throw new ApiError(400, "Token mismatched");

    const user = await User.findById(decodedToken.id);
    if (!user) throw new ApiError(401, "Unauthorized request");

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); // Log the error
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
