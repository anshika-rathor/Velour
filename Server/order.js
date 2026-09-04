const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
userId : mongoose.Schema.Types.ObjectId,
    products: [
        {
            productId : mongoose.Schema.Types.ObjectId,
            quantity : Number
        }
     ],
totalPrice : Number,
status : String,
expectedDelivery : Date,
deliveryMessage : String ,
orderNumber :String,
listingPrice:Number,
discount:Number,
deliveryFee:Number,
paymentMethod:String,
paymentStatus:{
    type:String,
    default:"pending"
},
razorpayOrderId:String,
razorpayPaymentId:String
});
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;