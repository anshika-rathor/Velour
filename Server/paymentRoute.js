const express = require("express");
const {protect} = require("./middleware");
const router = express.Router();
const instance = require("./config/razorpay");
const crypto = require("crypto");
const Order = require("./order");
const Cart = require("./cart");

router.post("/payment/create",protect,async(req,res)=>{
   try{
        const order = await instance.orders.create({
        amount:req.body.amount,
        currency:"INR",
        receipt :req.body.receipt

    });
    const saveOrder = await Order.create({
        userId: req.user._id,
        totalPrice: req.body.amount/100,
        paymentStatus:"pending",
        razorpayOrderId:order.id
    });
    res.json(order);
    console.log("SAVED ORDER : ",saveOrder);
}
catch(err){
    res.status(500).json({message:err.message});
}

});

router.post("/payment/verify",protect,async(req,res)=>{
    console.log("VERIFY ROUTE REACHED");

    try{
       const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
       
        const gen_sign = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET);
        gen_sign.update (`${razorpay_order_id}|${razorpay_payment_id}`);
        const final_sign = gen_sign.digest("hex");

        if(final_sign == razorpay_signature){
           const order = await Order.findOneAndUpdate(
                {razorpayOrderId:razorpay_order_id},
                {paymentStatus:"paid" , razorpayPaymentId:razorpay_payment_id},
                {new:true}
            );
            console.log("Order userId :",order.userId);
            await Cart.findOneAndUpdate(
                {userId:order.userId},
                {products:[]}
            );
            console.log(order);
           res.status(200).json({success:true , message : "Payment verified"});      
               
        }
        else{
            res.status(400).json({success:false , message:"Invalid Signature"});
        }
        
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
});
module.exports = router;

