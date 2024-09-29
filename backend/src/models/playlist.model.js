import mongoose, { Schema } from "mongoose";
const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    songs: [
      {
        songNameOfSongs: { type: String, required: true },
        filePath: { type: String, required: true },
        coverPath: { type: String, required: true },
        duration: { type: String, required: true },
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);
export const Playlist = mongoose.model("Playlist", playlistSchema);
