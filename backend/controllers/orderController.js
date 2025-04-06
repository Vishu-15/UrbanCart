require('dotenv').config()
const Order = require("../models/order");
const User = require("../models/user");
const { Cashfree } = require("cashfree-pg");

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

module.exports.createOrder = async(req,res)=>{
  try{
    console.log(req.body);
    let{name,street,city,state,postalCode,country,phoneNumber,email}=req.body;
  
    const userId = req.user._id;
    const user = await User.findById(userId).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Update user address if missing or incomplete
    if (!user.address) {
      user.address = {};
    }
    user.address.street = user.address.street || street;
    user.address.city = user.address.city || city;
    user.address.state = user.address.state || state;
    user.address.postalCode = user.address.postalCode || postalCode;
    user.address.country = user.address.country || country;
  
    // Update phone number if missing
    if (!user.phoneNumber) {
      if( phoneNumber.length==10){
        user.phoneNumber = phoneNumber;
      }
      else{
        res.status(401).json({message:"Enter a valid phone no. : "});
      }
    }
  
    await user.save();
  
    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
  
    let userCart = user.cart;
    let totalAmount = userCart.reduce((sum,item)=>{
        return sum+(parseFloat(item.productId.price)*(item.quantity));
        },0).toFixed(2)
  
    const newOrder = new Order({
      user:userId,
      items:user.cart,
      totalAmount:totalAmount,
      shippingAddress:user.address
    });
    await newOrder.save();
    console.log(newOrder);
  
    var request = {
      "order_amount": totalAmount,
      "order_currency": "INR",
      "order_id": newOrder._id,
      "customer_details": {
          "customer_id": userId,
          "customer_phone": user.phoneNumber,
          "customer_name": user.name,
          "customer_email": user.email,
      },
      // "order_meta": {
      //     "return_url": "https://www.google.com",
      //     "payment_methods": "cc,dc,upi",
      // }
    };
  
    Cashfree.PGCreateOrder("2023-08-01", request)
    .then((response) => {
        console.log('Order created successfully');
        res.status(201).json(response.data);
    })
    .catch((error) => {
        console.error('Error:', error.response?.data?.message || error.message || "Unknown error");
        res.status(500).json({ error: error.response?.data?.message || "Payment processing error" });
    });
  }
  catch(e){
    res.status(401).json({message:e.message});
    console.log(e.message);
  }
}

module.exports.verifyPayment = async(req,res)=>{
    let {orderId} = req.query;
    const user = await User.findById(req.user._id);
  
    Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
    .then(async(response) => {
      console.log('Order fetched successfully:', response.data);
      
      if (!response.data || response.data.length <= 0) {
        console.log("Order not created!");
        return res.status(404).json({ error: "Order not found" });
      }
  
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found in database" });
      }
  
      if (response.data[0].payment_status !== "SUCCESS") {
        order.paymentStatus = "failed";
        await order.save();
        console.log("Order status updated to failed");
        return res.status(201).json({ status: "failed" });
      }
  
      order.paymentStatus = "completed";
      await order.save();
      console.log("Order status updated to completed");
  
      user.cart = [];
      await user.orders.push({ orderId: orderId, date: Date.now() });
      await user.save();
      console.log("Cart cleared and order saved");
  
      res.status(201).json(response.data);
  
    }).catch((error) => {
        console.error('Error:', error.response?.data?.message || error.message || "Unknown error");
        Order.findByIdAndDelete(orderId)
          .then(() => console.log("Order deleted due to failed verification"))
          .catch(err => console.error("Error deleting order:", err));
        res.status(500).json({ error: error.response?.data?.message || "Payment verification error" });
    });
}

module.exports.getAllOrders = async(req,res)=>{
    try{
      let orders = await Order.find({}).populate("items.productId").populate("user");
      res.json(orders);
    }
    catch(e){
      res.status(500).json(e.message);
    }
}