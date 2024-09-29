import mongoose, { Schema } from "mongoose";
const historySchema = new Schema(
  {
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
export const History = mongoose.model("History", historySchema);
