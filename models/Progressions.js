import mongoose from "mongoose";

const chordSchema = new mongoose.Schema({
  note: String,
  octave: String,
  chord: String,
});

const progressionSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true, default: "Untitled" },
  userID: { type: String, required: true },
  tempo: { type: Number, default: 120 },
  instrument: { type: String, default: "acoustic_grand_piano" },
  chords: [chordSchema],
});

progressionSchema.index({ uuid: 1 }, { unique: true });

const Progression =
  mongoose.models.Progression ||
  mongoose.model("Progression", progressionSchema);

module.exports = Progression;
