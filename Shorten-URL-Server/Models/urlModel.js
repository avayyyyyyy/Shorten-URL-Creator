import mongoose from "mongoose";

const urlSchema = mongoose.Schema(
  {
    URL: { type: String },
    shortID: { type: String },
    totalCicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const URLModels = mongoose.model("URL", urlSchema);
