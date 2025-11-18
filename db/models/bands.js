import mongoose from "mongoose";

const bandSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String },
  image: { type: String },
  wiki: { type: String },
  youtube: { type: String },
  teaser: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Use existing model if it exists, otherwise create
const BandModel = mongoose.models.Band || mongoose.model("Band", bandSchema);

export default BandModel;
