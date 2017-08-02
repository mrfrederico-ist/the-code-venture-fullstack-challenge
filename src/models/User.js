const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  github: { type: String, unique: true },
  token: String,
})

// ==================
const User = mongoose.model('User', userSchema)

module.exports = User
