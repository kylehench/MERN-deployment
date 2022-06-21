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
  skills: {
    type: [String],
    default: []
  },
  likeCount: {
    type: Number,
    default: 0
  },
}, { timestamps: true })

module.exports = mongoose.model('Pet', PetSchema)