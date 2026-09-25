import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../Utils/axiosInstance";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Booking = {
  _id: string;
  customer: { name: string; email: string; phone?: string };
  date: string;
  status: string;
  address?: string;
};

type ProviderDashboardProps = {
  user: User;
};

const ProviderDashboard = ({ user }: ProviderDashboardProps) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [isAvailableNow, setIsAvailableNow] = useState(true);
  const [loading, setLoading] = useState(true);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    fetchBookings();
    fetchProfile();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/booking/provider");
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      setAvailability(res.data.user.availability || []);
      setIsAvailableNow(res.data.user.isAvailableNow ?? true);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const toggleDay = (day: string) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const saveAvailability = async () => {
    try {
      await axiosInstance.put("/auth/availability", {
        availability,
        isAvailableNow,
      });
      alert("Availability updated");
    } catch (error) {
      console.error("Failed to update availability:", error);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await axiosInstance.put(`/booking/${bookingId}/status`, { status });
      fetchBookings();
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const upcomingBookings = bookings.filter((b) => b.status === "confirmed");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white shadow-md p-6 hidden md:flex md:flex-col md:justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6 text-blue-600">
            Provider Panel
          </h2>
          <p className="text-sm text-gray-500 mb-6">{user.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:underline text-left"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Pending Requests</h3>
            <p className="text-2xl font-bold">{pendingBookings.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Upcoming Bookings</h3>
            <p className="text-2xl font-bold">{upcomingBookings.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Total Bookings</h3>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Availability</h2>

          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={isAvailableNow}
              onChange={(e) => setIsAvailableNow(e.target.checked)}
            />
            <span className="text-sm">Currently accepting bookings</span>
          </label>

          <div className="flex flex-wrap gap-2 mb-4">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  availability.includes(day)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <button
            onClick={saveAvailability}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Save Availability
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : pendingBookings.length === 0 ? (
            <p className="text-gray-400 text-sm">No pending requests</p>
          ) : (
            <div className="space-y-3">
              {pendingBookings.map((b) => (
                <div
                  key={b._id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{b.customer.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(b.date).toLocaleString()}
                    </p>
                    {b.address && (
                      <p className="text-sm text-gray-400">{b.address}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateBookingStatus(b._id, "confirmed")}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateBookingStatus(b._id, "declined")}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>

          {upcomingBookings.length === 0 ? (
            <p className="text-gray-400 text-sm">No upcoming bookings</p>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((b) => (
                <div
                  key={b._id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{b.customer.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(b.date).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => updateBookingStatus(b._id, "completed")}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Mark Completed
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
