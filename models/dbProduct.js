//BASICALLY IT WILL BE MASKS

import mongoose from "mongoose";

const maskSchema = mongoose.Schema({
  name: String,
  desc: String,
  type: String,
  price: mongoose.SchemaTypes.Decimal128,
  postedAt: String,
  image: String,
  discount: mongoose.SchemaTypes.Decimal128,
  onSale: Boolean,
  popularity: {
    sales: mongoose.SchemaTypes.Number,
    clicks: mongoose.SchemaTypes.Number,
  },
});

export default mongoose.model("masks", maskSchema);
