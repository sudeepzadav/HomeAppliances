const Booking = require("../model/bookingSchema");
const User = require("../model/userSchema");

// -------------------------------------------
//                CREATE A BOOKING
// -------------------------------------------
async function createBooking(req, res) {
  try {
    const customerId = req.user.id;
    const { service, issue, date, timeSlot, name, phone, address } = req.body;

    if (!service || !date || !timeSlot || !name || !phone || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const booking = await Booking.create({
      customer: customerId,
      service,
      issue,
      date,
      timeSlot,
      name,
      phone,
      address,
    });

    res.status(201).json({ success: true, message: "Booking requested", booking });
  } catch (error) {
    console.error("Create booking error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create booking" });
  }
}

// -------------------------------------------
//                GET MY BOOKINGS
// -------------------------------------------
async function getMyBookings(req, res) {
  try {
    const customerId = req.user.id;

    const bookings = await Booking.find({ customer: customerId })
      .populate("provider", "name email phone")
      .sort({ date: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Get my bookings error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
}

// -------------------------------------------
//            GET PROVIDER'S BOOKINGS
// -------------------------------------------
async function getProviderBookings(req, res) {
  try {
    const providerId = req.user.id;

    const bookings = await Booking.find({ provider: providerId })
      .populate("customer", "name email phone")
      .sort({ date: 1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Get provider bookings error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
}

// -------------------------------------------
//            UPDATE BOOKING STATUS
// -------------------------------------------
async function updateBookingStatus(req, res) {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const providerId = req.user.id;

    const validStatuses = ["confirmed", "declined", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const booking = await Booking.findOne({ _id: bookingId, provider: providerId });
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ success: true, message: "Booking updated", booking });
  } catch (error) {
    console.error("Update booking status error:", error.message);
    res.status(500).json({ success: false, message: "Failed to update booking" });
  }
}


async function assignProvider(req, res) {
  try {
    const { bookingId } = req.params;
    const { providerId } = req.body;

    const provider = await User.findOne({ _id: providerId, role: "Provider" });
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider not found" });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { provider: providerId, status: "assigned" },
      { new: true }
    ).populate("provider", "name email");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Provider assigned", booking });
  } catch (error) {
    console.error("Assign provider error:", error.message);
    res.status(500).json({ success: false, message: "Failed to assign provider" });
  }
}

// -------------------------------------------
//            GET AVAILABLE PROVIDERS
// -------------------------------------------
async function getAvailableProviders(req, res) {
  try {
    const providers = await User.find({
      role: "Provider",
      isVerified: true,
      isAvailableNow: true,
    }).select("-password");

    res.status(200).json({ success: true, providers });
  } catch (error) {
    console.error("Get providers error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch providers" });
  }
}

module.exports = {
  createBooking,
  getMyBookings,
  getProviderBookings,
  updateBookingStatus,
  assignProvider,
  getAvailableProviders,
};