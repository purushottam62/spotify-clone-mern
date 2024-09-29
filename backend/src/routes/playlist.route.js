import { Router } from "express";
import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  updatePlaylist,
  getAllSongOfPlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middilewares/auth.middileware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createPlaylist);

router
  .route("/:playlistId")
  .get(getPlaylistById)
  .patch(updatePlaylist)
  .delete(deletePlaylist);

router.route("/add/:playlistId").patch(addSongToPlaylist);
router.route("/get/:playlistId").get(getAllSongOfPlaylist);
router.route("/remove/:songId/:playlistId").patch(removeSongFromPlaylist);

router.route("/user/:userId").get(getUserPlaylists);

export default router;
