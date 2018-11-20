import mongoose from "mongoose"

//Todo: add uniqueness and email validations to email field
var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  katas: { type: [], default: [] },
})

export default mongoose.model("Deck", schema)
