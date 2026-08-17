const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("./User");
const { protect } = require('./middleware');

const router = express.Router();

router.post('/signup',async(req,res)=>{
    try{
    const {name,email,password ,phone} = req.body;
   const hashedPassword = await bcrypt.hash(password,10); 
    const user = new User({name , email , password:hashedPassword , phone});
    await user.save();
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
    res.json({token, user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }
});

router.post('/login',async(req,res)=>{
    try{
        const {email , password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message: "User not found"});

    const isMatch = await bcrypt.compare(password , user.password );
    if(!isMatch) return res.status(401).json({message : " Wrong Password !"});

    const token = jwt.sign({id:user._id} , process.env.JWT_SECRET);
    res.json({token, user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
});

router.get('/me', protect, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
});
router.put('/me',protect,async(req,res)=>{
    const {name,email,phone} = req.body;
    try{
        const update = await User.findByIdAndUpdate(
        req.user.id,
        {name,email,phone},
        {new:true , runValidators:true}

    ).select('-password');
    res.json(update);
   
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
    
});
module.exports = router;