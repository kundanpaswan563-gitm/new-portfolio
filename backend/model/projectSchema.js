const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name:String,
  detail:String,
  technology:String,
  link:String
});

module.exports = mongoose.model("Project", projectSchema);