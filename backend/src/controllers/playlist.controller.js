import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name && !description) {
    throw new ApiError(400, "name or description not found");
  }
  if (!req.user) {
    throw new ApiError(401, "User not authenticated");
  }
  if (!req.user._id)
    throw new ApiError(401, "req.user found but req.user_id not found");
  const user = await User.findById(req.user._id);
  if (!user)
    throw new ApiError(401, "no user found therefore unauthorised request");
  // console.log("playlist is being created");
  const playlist = await Playlist.create({
    name,
    description,
    owner: user,
  });
  // console.log("playlist created");

  if (!playlist)
    throw new ApiError(500, "something went wrong while creating playlist");
  // console.log(playlist._id);

  return res
    .status(200)
    .json(new ApiResponse(200, { playlist }, "playlist created successfully"));

  //TODO: create playlist
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  // console.log("request received");
  const { userId } = req.params;
  if (!userId) {
    // console.log("userId is not received");
  }
  // console.log("userId is received", userId);
  //TODO: get user playlists

  const playlists = await Playlist.find({ owner: userId })

    .exec();
  if (!playlists)
    throw new ApiError(500, "server error failed to find you playlist");
  // console.log(playlists);
  return res
    .status(200)
    .json(new ApiResponse(200, { playlists }, "all playlist sent"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = Playlist.findById(playlistId);
  //TODO: get playlist by id
});

const addSongToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // console.log(playlistId);
  const songDetails = req.body;
  // console.log(songDetails);
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  playlist.songs.push({
    songNameOfSongs: songDetails.song.songNameOfSongs,
    filePath: songDetails.song.filePath,
    coverPath: songDetails.song.coverPath,
    duration: songDetails.song.duration,
  });
  await playlist.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { playlist }, "Song added to playlist"));
});
const getAllSongOfPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(500, "failed to find playlist ");
  }
  const songs = await playlist.songs;
  return response
    .status(200)
    .json(new ApiResponse(200, "songs details fetched", songs));
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
  getAllSongOfPlaylist,
};
