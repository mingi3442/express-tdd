import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: { type: String, required: true },
  price: Number,
});

export const Product = mongoose.model("Product", ProductSchema);
