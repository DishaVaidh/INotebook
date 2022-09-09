const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');//for data validation
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "Iamgoodgirl";

//ROUTE 1 : create a user using : POST "/api/auth/createuser".Doesnt No login require
router.post('/createuser', [
  body('email').isEmail(),
  body('name', 'Enter a valid name').isLength({ min: 3 }),//custom error message can also send
  body('password', 'Enter a length that must be minimum 5 for password').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  //if there are errors return bad requests and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  /*const user=User(req.body)
  user.save()//this will save in test database(default link)
  res.send(req.body);*/

  try {
    //check whether the user with this email present already
    let user = await User.findOne({ success,email: req.body.email })

    if (user) {
      return res.status(400).json({ success,error: "Sorry  a user with already this email present" })
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create a new user
    user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log(authtoken);
    success=true;
    res.json({ success,authtoken })


  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})

//ROUTE 2 : Authenticate a user using : POST "/api/auth/login".Doesnt No login require
router.post('/login', [
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password can't be blank").exists(),
], async (req, res) => {
  let success = new Boolean(false);
  //if there are errors return bad requests and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user1 = await User.findOne({ email });
    if (!user1) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" })
    }
    const passwordCompare = await bcrypt.compare(password, user1.password)
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success,error: "Please try to login with correct credentials" })
    }

    const data = {
      user: {
        id: user1.id//this id is unique and can access more quickly in mongodb
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success,authtoken })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})

//ROUTE 3 : get user detail : POST "/api/auth/getuser". login require
router.post('/getuser', fetchuser,async (req, res) => {//fetchuser is a middleware and its next function is async wala
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})
module.exports = router