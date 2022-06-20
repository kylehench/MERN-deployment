const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name must be 3 characters or longer"]
  },
  type: {
    type: String,
    minlength: [3, "Type must be 3 characters or longer"]
  },
  description: {
    type: String,
    minlength: [3, "Description must be 3 characters or longer"]
  },
  skillCount: {
    type: Number,
    min: [0, "Must have at least 0 skills"],
    max: [3, "Must not have more than 3 skills"]
  },
}, { timestamps: true })

module.exports = mongoose.model('Pet', PetSchema)