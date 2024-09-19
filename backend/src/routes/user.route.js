import { Router } from "express";
import {
  loginUser,
  registerUser,
  logOutUser,
  refreshAccessToken,
} from "../controllers/registerUser.controller.js";
import { upload } from "../middilewares/multer.middileware.js";

import { verifyJWT } from "../middilewares/auth.middileware.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refreshToken").post(refreshAccessToken);
export default router;
