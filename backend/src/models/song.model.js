import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const songSchema = new Schema(
  {
    songNameOfSongs: {
      type: String,
      require: true,
    },
    filePath: {
      type: String,
      require: true,
    },
    coverPath: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
      require: true,
    },
    views: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
songSchema.plugin(mongooseAggregatePaginate);
export const Song = mongoose.model("Song", songSchema);
