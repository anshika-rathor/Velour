const dotenv = require("dotenv");
const express = require("express");
const mongoose  = require("mongoose");
const authRouter = require('./auth');
const {protect} = require("./middleware");
const cors = require('cors');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch((err)=>console.log("Not Connected" , err));
mongoose.connection.once("open", () => {
    console.log("Connected to DB:", mongoose.connection.name);
});

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);

app.get('/protected',protect,(req,res)=>{
    res.json({message:"You are logged in !"});
});

app.use('/api' , require("./productRoute"));
app.use('/api' , require("./cartRoute"));
app.use('/api' , require("./orderRoute"));
app.use('/api' , require("./wishListRoute"));
app.use('/api' , require("./addressRoute"));
app.use('/api' , require("./reviewRoute"));
app.use('/api' , require("./notificationRoute"));
app.use('/api' , require("./outfitRoute"));
app.use('/api',  require("./paymentRoute"));

app.use((req,res,next)=>{
    res.status(404).json({message: "Server not found"});
});
app.use((err,req,res,next) =>{
    res.status(500).json({message: err.message});
});

app.listen(process.env.PORT,()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
});



