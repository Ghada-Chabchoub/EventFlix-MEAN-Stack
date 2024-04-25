const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    phone: {
      type: Number,
      default: 0
    },
    adress:{
      type: String,
      default:''
    },
    cart:{
      type: Array,
      default: []
    },
    facture_history:{
      type: Array,
      default: []
    }

  })
);

module.exports = User;