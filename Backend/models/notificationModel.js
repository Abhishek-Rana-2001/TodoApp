const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
  userId : {type : mongoose.Schema.Types.ObjectId, ref : "Todo"},
  title : {type : String, required : true},
  description:{type : String , required : true},
  sentAt: { type: Date, default: Date.now },
  sent: { type: Boolean, default: false }
})

const Notificaiton = mongoose.model("Notification" , notificationSchema )

module.exports = Notificaiton;