import mongoose, { Schema } from "mongoose";
import { STIM_TYPES } from "../../constants/stimuli.js";

const StimSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: String,
  url: String,
  dirtIndex: Number,
  coordinates: [Number, Number],
  apprStatus: { type: "string", enum: ["approved", "pending", "cancelled"] },
  stimType: {
    type: "string",
    enum: STIM_TYPES,
  },
});
const StimuliDataSchema: Schema = new mongoose.Schema({
  rationale: String,
  longRationale: [String],
  timestamp: Date,
  averageDirt: Number,
  stimuli: [StimSchema],
  locale: new mongoose.Schema(
    {
      localeKey: String,
      upperLocale: String,
    },
    { _id: false }
  ),
});

export const MongoStimuliData =
  mongoose.models.StimuliData ||
  mongoose.model("StimuliData", StimuliDataSchema);
