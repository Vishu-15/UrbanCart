require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const sessionOptions = require("./config/sessionOptions");

const productRoute = require("./routes/productRoutes");
const userRoute= require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");

const dbUrl = process.env.MONGO_URL;
main()
.then(()=>{console.log("database initialized")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.set('trust proxy', 1);

app.use(cors({
  origin: 'https://urbancart-frontend.onrender.com',
  credentials: true, // Allow cookies to be sent
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
// passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

app.use('/api',productRoute);
app.use('/api',userRoute);
app.use('/api',orderRoute);

app.use((err,req,res,next)=>{
  let{statusCode=500,message="Something Went Wrong!"}=err;
  res.status(statusCode).json({message});
});

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("app is listening at port",PORT);
});


/*
app.get("/deleteallprod",async(req,ress)=>{
    let deletedProd = await Product.deleteMany();
    res.send(deletedProd);
});
*/


