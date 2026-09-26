const express = require("express");

const {
  createBooking,
  getMyBookings,
  getProviderBookings,
  updateBookingStatus,
  assignProvider,
  getAvailableProviders,
} = require("../controller/bookingController");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/providers", auth, getAvailableProviders);
router.post("/", auth, createBooking);
router.get("/my", auth, getMyBookings);
router.get("/provider", auth, getProviderBookings);
router.put("/:bookingId/status", auth, updateBookingStatus);
router.put("/:bookingId/assign", auth, assignProvider);

module.exports = router;