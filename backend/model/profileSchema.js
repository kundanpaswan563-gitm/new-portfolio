const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  name: String,
  heroTitle: String,
  heroLine1: String,
  heroLine2: String,
  description: String,
  profileImage: String

});

module.exports = mongoose.model("Profile", profileSchema);