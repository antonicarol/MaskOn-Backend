//BASICALLY IT WILL BE MASKS

import mongoose from "mongoose";

const maskSchema = mongoose.Schema({
  name: String,
  desc: String,
  type: String,
  price: mongoose.SchemaTypes.Decimal128,
  postedAt: String,
  image: String,
});

export default mongoose.model("masks", maskSchema);
