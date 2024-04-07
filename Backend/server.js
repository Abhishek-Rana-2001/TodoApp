const express = require("express")
const app  = express()
const cors = require("cors")
const http = require("http")
const server = http.createServer(app)
const { Server } = require('socket.io')
const mongoose = require("mongoose")
const menuroutes = require("./routes/menuroutes")
const authroutes = require("./routes/authroutes")
const todoRoutes = require("./routes/todoRoutes");
const User = require("./models/usermodel");
require('dotenv').config();
const webpush = require("web-push")
const verifyToken = require("./contollers/verificationController")
const Subscription = require("./models/subscriptionmodel")
const startScheduler = require('./utils/Scheduler');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions))

  
  
  
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });
  
  
  io.on('connection', (socket) => {
    // console.log('A user connected');
    
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
    
    socket.on('chat message', (msg) => {
      console.log('Message received: ', msg);
      // Broadcast the message to all connected clients
      io.emit('chat message', msg);
    });
  });
  
  const port = process.env.PORT || 5000
  
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true ,
    useUnifiedTopology : true
  }).then(()=>{
    console.log(`DB Connected`)
    startScheduler();
  })
  .catch(err=>console.log("DB Connection error" + err))
  
  
  app.use(express.json());
  app.use("/api" ,menuroutes)
  app.use("/api" ,authroutes)
  app.use("/api" ,todoRoutes)
  app.post('/subscribe', verifyToken, async(req, res) => {
    try{
      const subscriptionData = req.body;
      const subScription = await Subscription.create(subscriptionData)
      
      // Associate the subscription data with the user
      const user = await User.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(500).json({ error: 'Failed to find user' });
      }
      user.subscriptions.push(subScription._id);
      await user.save();
      res.status(201).json({});
    }catch (error) {
      console.error('Error saving subscription:', error);
      res.status(500).json({ error: 'Failed to save subscription' });
    }
      // Add the subscription data to the user's subscriptions array
      
      // Save the user document with the updated subscriptions
  });


server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });