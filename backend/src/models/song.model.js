import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const songSchema = new Schema(
  {
    songDetail: {
      type: String,
      require: true,
    },
    description: {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
songSchema.plugin(mongooseAggregatePaginate);
export const Song = mongoose.model("Song", songSchema);
