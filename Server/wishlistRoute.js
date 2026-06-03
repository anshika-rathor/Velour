const express = require("express");
const {protect} = require("./middleware");
const WishList = require("./wishlist");
const router = express.Router();

router.get('/wishlist',protect,async(req,res)=>{
try{
    const wish = await WishList.find({userId:req.user.id});
    res.json(wish);
}
catch(err){
    res.status(500).json({message:err.message});
}
});

router.post('/wishlist',protect,async(req,res)=>{
try{
    const addWish = await WishList.findOneAndUpdate(
    {userId:req.user.id},
    {$addToSet:{products:req.body.productId}},
    {upsert:true,new:true});
    res.json(addWish);
}
catch(err){
    res.status(500).json({message:err.message});
}
});

router.delete('/wishlist',protect,async(req,res)=>{
try{
    const dltWish = await WishList.findOneAndUpdate(
        {userId:req.user.id},
        {$pull:{products:req.body.productId}} ,
        {new:true});
    res.json(dltWish);
}
catch(err){
    res.status(500).json({message:err.message});
}
});
module.exports = router;