import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Song from "../models/song.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const playlist = await Playlist.create({
    name,
    description,
    userId: req.user._id,
  });
  return new ApiResponse(res, 201, "Playlist created successfully", playlist);

  //TODO: create playlist
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists
  const playlists = Playlist.find({ userId });
  return new ApiResponse(res, 200, "User playlists", playlists);
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = Playlist.findById(playlistId);
  //TODO: get playlist by id
});

const addSongToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, songId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }
  const song = await Song.findById(songId);
  if (!song) {
    throw new ApiError(404, "Song not found");
  }
  playlist.songs.push(songId);
  await playlist.save();
  return new ApiResponse(res, 200, "Song added to playlist", playlist);
});

const removeSongFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, songId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }
  const songIndex = playlist.songs.indexOf(songId);
  if (songIndex === -1) {
    throw new ApiError(404, "Song not found in playlist");
  }
  playlist.songs.splice(songIndex, 1);
  await playlist.save();
  return new ApiResponse(res, 200, "Song removed from playlist", playlist);

  // TODO: remove video from playlist
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByIdAndDelete(playlistId);
  if (!playlist) throw new ApiError(404, "playlist don't found");
  return new ApiResponse(res, 200, "playlist deleted", playlist);
  // TODO: delete playlist
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
