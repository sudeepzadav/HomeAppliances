const crypto = require("crypto");
const Payment = require("../model/paymentSchema");
const Booking = require("../model/bookingSchema");

const {
  ESEWA_STATUS_URL,
  ESEWA_PRODUCT_CODE,
  buildEsewaFormData,
} = require("../utils/esewa");

function generateTransactionUuid() {
  return `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}


function toNumber(value) {
  return Number(String(value).replace(/,/g, ""));
}

function buildEsewaResponse(payment) {
  const formData = buildEsewaFormData({
    amount: payment.amount,
    transactionUuid: payment.transactionUuid,
    successUrl: `${process.env.FRONTEND_URL}/payment/success`,
    failureUrl: `${process.env.FRONTEND_URL}/payment/failure`,
  });

  return {
    success: true,
    message: "Payment initiated, proceed to eSewa",
    paymentId: payment._id,
    esewaFormUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
    formData,
  };
}

// -------------------------------------------
//  INITIATE PAYMENT FOR A BOOKING
// -------------------------------------------
async function initiatePayment(req, res) {
  try {
    const userId = req.user.id;
    const { bookingId } = req.body;

    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "bookingId is required" });
    }

    const booking = await Booking.findOne({ _id: bookingId, customer: userId });
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (booking.status === "confirmed") {
      return res
        .status(400)
        .json({ success: false, message: "Booking is already paid" });
    }

  
    const amount = booking.price;
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking amount" });
    }

    const payment = await Payment.create({
      booking: booking._id,
      user: userId,
      amount,
      transactionUuid: generateTransactionUuid(),
      status: "PENDING",
    });

    return res.status(201).json(buildEsewaResponse(payment));
  } catch (error) {
    console.error("Initiate payment error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to initiate payment" });
  }
}

// -------------------------------------------
//  VERIFY PAYMENT (eSewa redirect callback)
// -------------------------------------------
async function verifyPayment(req, res) {
  try {
    const userId = req.user.id;
    const { data } = req.body;

    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Missing payment data" });
    }

    const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
    const {
      transaction_uuid,
      total_amount,
      status: esewaStatus,
      transaction_code,
    } = decoded;

    const payment = await Payment.findOne({ transactionUuid: transaction_uuid });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    
    if (String(payment.user) !== String(userId)) {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }

    
    if (payment.status === "PAID") {
      return res
        .status(200)
        .json({ success: true, message: "Payment already confirmed", payment });
    }

    
    if (toNumber(total_amount) !== payment.amount) {
      payment.status = "FAILED";
      payment.rawResponse = decoded;
      await payment.save();
      return res
        .status(400)
        .json({ success: false, message: "Payment amount mismatch" });
    }

    if (esewaStatus !== "COMPLETE") {
      payment.status = "FAILED";
      payment.rawResponse = decoded;
      await payment.save();
      return res
        .status(400)
        .json({ success: false, message: "Payment not completed" });
    }

    const verifyUrl = `${ESEWA_STATUS_URL}?product_code=${ESEWA_PRODUCT_CODE}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;
    const verifyRes = await fetch(verifyUrl);
    const verifyData = await verifyRes.json();

    if (verifyData.status !== "COMPLETE") {
      payment.status = "FAILED";
      payment.rawResponse = verifyData;
      await payment.save();
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    payment.status = "PAID";
    payment.refId = transaction_code;
    payment.rawResponse = verifyData;
    payment.paidAt = new Date();
    await payment.save();

    await Booking.findByIdAndUpdate(payment.booking, { status: "confirmed" });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error("Verify payment error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
}

// -------------------------------------------
//         GET MY PAYMENTS
// -------------------------------------------
async function getMyPayments(req, res) {
  try {
    const userId = req.user.id;
    const payments = await Payment.find({ user: userId })
      .populate("booking")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("Get my payments error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch payments" });
  }
}

module.exports = { initiatePayment, verifyPayment, getMyPayments };