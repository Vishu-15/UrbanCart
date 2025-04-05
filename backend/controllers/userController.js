const User = require("../models/user");


module.exports.getAllUsers = async(req,res)=>{
    try{
      let allUsers = await User.find();
      res.json(allUsers);
    }
    catch(e){
      res.status(500).json(e.message);
    }
}

module.exports.editUserDetails = async (req, res) => {
    // Check if there are validation errors
    try {
      // Find the user by ID (make sure user is authenticated before this)
      let currUser = await User.findById(req.user._id);

      // If user doesn't exist, return an error
      if (!currUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the fields in the current user object
      if (req.body.name) currUser.name = req.body.name;
      if (req.body.email) currUser.email = req.body.email;
      if (req.body.address) currUser.address = req.body.address;
      if (req.body.phoneNumber) currUser.phoneNumber = req.body.phoneNumber; // Update phone number if provided

      // Save the updated user
      await currUser.save();

      // Send back the updated user or a success message
      res.json({ message: 'User updated successfully', user: currUser });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}

module.exports.getCurrentUser = async(req,res)=>{
    try{
      let currUser = await User.findById(req.user._id)
      .populate("cart.productId")
      .populate("wishlist")
      .populate({
        path: "orders.orderId",
        populate: {
          path: "items.productId", // This ensures items.productId gets populated after orders.orderId
        }
      });
      res.status(201).json({"user":currUser});
    }
    catch(e){
      res.status(400).json({"message":e.message});
    }
}

module.exports.addToCart = async(req,res)=>{
    try{
      let {productId,quantity} = req.query;
      let user = await User.findById(req.user._id).populate("cart.productId");
      let product = user.cart.find((item)=>{return item.productId._id == productId});
      console.log(product);
      if(!product || product==undefined){
        user.cart.push({productId,quantity});
      }
      else{
        if(product.quantity<product.productId.minimumOrderQuantity){
          product.quantity+=1;
        }
        else{
          res.json({message:"Minimum Order Quantity Exceeded"});
        }
      }
      // console.log(user);
      await user.save();
      res.json({message:"Product Added to Cart Succesfully"});
    }
    catch(e){
      res.status(500).json(e.message);
    }
}

module.exports.removeFromCart = async (req, res) => {
    try {
      let user = req.user;
      const { prodId } = req.query;
  
      user.cart = user.cart.filter((item) => item.productId != prodId);
  
      await user.save();
  
      console.log(user.cart);
      res.status(201).json({ message: "Item Removed from Cart Successfully!" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
}

module.exports.updateWishlist = async(req,res)=>{
    try{
      let {productId} = req.query;
      let currUser = await User.findById(req.user._id);
      if(currUser.wishlist.includes(productId)){
        currUser.wishlist = currUser.wishlist.filter((item)=> item!=productId);
      }
      else{
        currUser.wishlist.push(productId);
      }
      await currUser.save();
      console.log(currUser);
      res.status(201).json({message:"wishlist updated successfully !"});
    }
    catch(e){
      res.status(500).json(e.message);
    }
}

module.exports.signup = async(req,res)=>{
  try{
    let {name,email,password} = req.body;
    console.log(name,email,password);
    let newUser = new User({email,name});
    console.log(newUser);
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    // await newUser.save();
    res.json({message:"user added successfully",user:req.user});
  }
  catch(e){
    res.json({message:e.message});
  }
}

module.exports.login = async (req, res)=>{
    console.log(req.user);
    res.status(200).json({ message: 'Login successful', user: req.user });
}

module.exports.logout = async (req, res) => {
    if (!req.user) {  // Check if user is logged in
        return res.status(401).json({ message: "User not logged in!" });
    }
  
    try {
        await req.logout((err)=>{
          if(!err){
            res.status(200).json({ message: "User logged out successfully" });
          }
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Error encountered while logging out!" });
    }
}