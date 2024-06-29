const mongoose = require('mongoose');

// mongoDb Connection URL 
const mongoURL = "mongodb://localhost:27017/mydata"

// set up MongoDB Connection 
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

// msg print to connected
db.on('connected',()=>{
    console.log("Connected to MongoDB Server");
})

db.on('error',()=>{
    console.log("MongoDB Connection error");
})

db.on('disconnected',()=>{
    console.log("MongoDB Disconnected");
})

// export the database connection
module.exports = db;