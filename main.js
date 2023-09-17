const express = require('express');
const app = express();
const User = require("./models/user")
const Subscriber = require("./models/subscription")
const Plans = require("./models/plan")
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");

const router = require('./routes')

app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use(layouts)
app.use(router);

const logger = (req, res, next) => {
    console.log('middleware running');
    next();
};

// app.use(logger)

mongoose.connect("mongodb://127.0.0.1:27017/test_db")
.then(() => {
  console.log('Connected to db successfully');
})
.catch(err => {
  console.log(err)
  throw new Error('Unabe to connect to db')
})
      
  
app.post('/login', async (req, res) =>{
    const { email, password } = req.body;
    try{
      if(!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password is required" });
      }
      const user = await User.findOne({ email, password });
      if(!user) {
        return res.status(401).json({ success: true, message: "Invalid login details" });
      }

      return res.status(200).json({ success: true, message: "Logged in successfully", data: user });
      
    } catch(err) {
      return res.status(500).json({ success: false, message: err.message });
    }
})
  

//   app.post('/subscriber',async (req, res) => {
//     const subscriber = new Subscriber({
//       subscribername: req.body.subscribername,
//       subscriberemail: req.body.subscriberemail,
//       phone: req.body.phone,
//       packages: req.body.packages

//       });
//     try{
//       const savedSubscriber = await subscriber.save()
//       console.log(savedSubscriber)
//       res.json(savedSubscriber);
//       } catch(err) {
//         res.json(err)
//       }
//       });
        
//   app.get('/subscriber', async (req ,res) => {
      
//     try{
//         const allSubsriber = await Subscriber.find();
//         res.json(allSubsriber);
//     }catch(err) {
//         res.json(err)
//     }
// });



app.get('/signUp', (req, res) => {
    res.render('signUp');
});
                
app.get('/login', (req, res) => {
    res.render('login');
});   





app.listen(4000, () => {
    console.log("App is Running")
});


const bcrypt = require('bcryptjs');


const myFunction = async () => {
    const password = 'Red12345'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Red12345', hashedPassword)
    console.log(isMatch)
}

myFunction()