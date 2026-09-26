import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../Utils/axiosInstance";

type User = { id: string; name: string; email: string; role: string };

type Provider = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  availability: string[];
};

type Booking = {
  _id: string;
  provider: { name: string; email: string; phone?: string };
  date: string;
  status: string;
  address?: string;
};

type CustomerDashboardProps = { user: User };

const CustomerDashboard = ({ user }: CustomerDashboardProps) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"book" | "bookings">("book");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProviders();
    fetchMyBookings();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await axiosInstance.get("/booking/providers");
      setProviders(res.data.providers || []);
    } catch (err) {
      console.error("Failed to fetch providers:", err);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await axiosInstance.get("/booking/my");
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedProvider || !date) {
      setError("Please select a provider and date");
      return;
    }

    try {
      await axiosInstance.post("/booking", {
        providerId: selectedProvider._id,
        date,
        address,
        notes,
      });

      setSuccess("Booking requested successfully!");
      setSelectedProvider(null);
      setDate("");
      setAddress("");
      setNotes("");
      fetchMyBookings();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create booking");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-100 text-blue-600";
      case "completed": return "bg-green-100 text-green-600";
      case "declined":
      case "cancelled": return "bg-red-100 text-red-600";
      default: return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-white shadow-md p-6 hidden md:flex md:flex-col md:justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6 text-green-600">Hi, {user.name}</h2>
          <ul className="space-y-3 text-gray-700">
            <li
              onClick={() => setTab("book")}
              className={`cursor-pointer ${tab === "book" ? "font-semibold text-green-600" : ""}`}
            >
              Book a Service
            </li>
            <li
              onClick={() => setTab("bookings")}
              className={`cursor-pointer ${tab === "bookings" ? "font-semibold text-green-600" : ""}`}
            >
              My Bookings
            </li>
          </ul>
        </div>
        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline text-left">
          Logout
        </button>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>

        {tab === "book" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Provider list */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Available Providers</h2>
              {providers.length === 0 ? (
                <p className="text-gray-400 text-sm">No providers available right now</p>
              ) : (
                <div className="space-y-3">
                  {providers.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => setSelectedProvider(p)}
                      className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedProvider?._id === p._id ? "border-green-600 bg-green-50" : ""
                      }`}
                    >
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-gray-500">
                        Available: {p.availability?.length ? p.availability.join(", ") : "Not set"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Booking form */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                {selectedProvider ? `Book ${selectedProvider.name}` : "Select a provider"}
              </h2>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

              <form onSubmit={handleBook} className="space-y-4">
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border p-2 rounded"
                  disabled={!selectedProvider}
                  required
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Service address"
                  className="w-full border p-2 rounded"
                  disabled={!selectedProvider}
                />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any notes for the provider..."
                  className="w-full border p-2 rounded"
                  disabled={!selectedProvider}
                />
                <button
                  type="submit"
                  disabled={!selectedProvider}
                  className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Request Booking
                </button>
              </form>
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">My Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-400 text-sm">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div key={b._id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{b.provider.name}</p>
                      <p className="text-sm text-gray-500">{new Date(b.date).toLocaleString()}</p>
                      {b.address && <p className="text-sm text-gray-400">{b.address}</p>}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;