require('dotenv').config()
const MongoStore = require('connect-mongo');
const dbUrl = process.env.MONGO_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret:process.env.SESSION_SECRET,
  },
  touchAfter: 24*3600,
});
store.on("error",(err)=>{
  console.log("ERROR IN MONGO SESSION STORE :",err);
});
const sessionOptions={
  store,
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
      expires: Date.now() + 7*24*60*60*1000,
      maxAge: 7*24*60*60*1000,
      httpOnly: true, //to prevent cross script attacks
  },
};

module.exports = sessionOptions;
  