const express = require('express');
const { authMiddleware } = require('../middleware');
const router = express.Router();
const { Account } = require('../db');
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async(req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    console.log(account);

    res.status(200).json({
        balance: account.balance
    })

})

router.post("/transfer", authMiddleware, async(req, res) => {
    console.log(req.body)
    console.log("-----------------------------------------------------> ");
    const session = await mongoose.startSession();

    session.startTransaction();
    try {
        const { to, amount } = req.body;
  
    const myAccount = await Account.findOne({ userId: req.userId }).session(session);


    if (!myAccount || myAccount.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
  
    await session.commitTransaction()
    res.status(200).json({
        message: "Transaction completed"
    })
  
    } catch(err) {
        await session.abortTransaction()
        res.status(400).json({
            message: "Transaction failed",
            error: err.message
        })
    } finally {
        session.endSession()
    }
    
})

module.exports = router;



