const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueTime: {
    type: Date,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  completed:{
    type:Boolean,
    default:false,
  },
  notified : {
    type: Boolean,
    default:false
  }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
