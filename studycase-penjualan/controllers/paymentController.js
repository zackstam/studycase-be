const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsynErrors");
const { stripe, secretStripe } = require('../config/index')

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await secretStripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "idr",
      metadata: {
        company: "ferdshop",
      },
    });
      req.data = {client_secret: myPayment.client_secret,}
    })
)

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: stripe });
  })
);


module.exports = router;