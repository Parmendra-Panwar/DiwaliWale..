const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = new Schema({
  frm: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  }
});

const Msges = mongoose.model("Msges", msgSchema);

module.exports = Msges;
