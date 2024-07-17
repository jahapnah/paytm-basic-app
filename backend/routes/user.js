const express = require("express");
const { signUpBody, signInBody, updateBody } = require("../validation/userType");
const {User,Account} = require("../db");
const jwt = require("jsonwebtoken")
const { authMiddleware } = require("../middleware");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
       console.log("hi")
      const payload = req.body;
      console.log(payload);
  
      const parsedPayload = signUpBody.safeParse(payload);
      console.log('printing parsed payload -------------------------- >', parsedPayload);
  
      if (!parsedPayload.success) {
        return res.status(400).json({
          message: 'Incorrect inputs',
          success: false
        });
      }
  
      const existingUser = await User.findOne({ username: req.body.username });
  
      if (existingUser) {
        return res.status(409).json({
          message: 'Username already exists',
          success: false
        });
      }
  
      const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
  
      const userId = user._id;
  
      await Account.create({
        userId,
        balance: 1 + Math.ceil(Math.random()) * 1000
      });
  
      const token = jwt.sign({ userId }, JWT_SECRET);
  
      return res.status(201).json({
        message: 'User created successfully',
        token: token,
        success: true
      });
  
    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({
        message: 'Error occured',
        error: error.message
      });
    }
  });


router.post("/signin", async(req, res) => {
    try {
        const payload = req.body;
        const parsedPayload = signInBody.safeParse(payload);


        if(!parsedPayload.success) {
            return res.status(411).json({
                message : "Wrong Inputs"
            })
        }

        const user = await User.findOne({
            username: parsedPayload.data.username,
            password: parsedPayload.data.password
        })


        if(!user){
            return res.status(411).json({
                message: "Incorrect username or password",
                success: false
            })
        }

        const userId = user._id;
        const token = jwt.sign({userId: user._id}, JWT_SECRET)

        const myUser = await User.findOne({username:req.body.username});


        return res.status(200).json({
            message: "User logged in successfully",
            token: token,
            success: true,
            firstName: myUser.firstName
        })
    } catch(err) {
        console.log("Error in signIn request", err);
    }   
    
})

router.put("/update", authMiddleware, async(req, res) => {
    console.log(req.body);

    const { success } = updateBody.safeParse(req.body);

    console.log(success);

    if(!success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    await User.updateOne({
        _id: req.userId
    },
        req.body
    ) 

    res.status(200).json({
        message: "User updated successfullt"
    })
})

router.get("/bulk", async(req, res) => {

    const filter = req.query.filter || "";
    
    const users = await User.find({
        $or : [
            {firstName : {
                $regex: filter
            }},
            {
                lastName: {
                    $regex: filter
                }
            }
        ]
    })

    res.json({
        user: users.map((user) => {
            return {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        })
    })
})

module.exports = router;