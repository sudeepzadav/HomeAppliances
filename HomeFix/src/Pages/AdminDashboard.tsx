import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../Utils/axiosInstance";

type User = { id: string; name: string; email: string; role: string };

type UserRow = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isDisabled: boolean;
};

type Booking = {
  _id: string;
  customer: { name: string; email: string };
  provider: { name: string; email: string };
  date: string;
  status: string;
};

type AdminDashboardProps = { user: User };

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"providers" | "users" | "bookings">("providers");
  const [pendingProviders, setPendingProviders] = useState<UserRow[]>([]);
  const [allUsers, setAllUsers] = useState<UserRow[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProviders();
    fetchAllUsers();
    fetchAllBookings();
  }, []);

  const fetchPendingProviders = async () => {
    try {
      const res = await axiosInstance.get("/admin/providers/pending");
      setPendingProviders(res.data.providers || []);
    } catch (error) {
      console.error("Failed to fetch pending providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/users");
      setAllUsers(res.data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const res = await axiosInstance.get("/admin/bookings");
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleVerify = async (providerId: string) => {
    try {
      await axiosInstance.put(`/admin/providers/${providerId}/verify`);
      fetchPendingProviders();
      fetchAllUsers();
    } catch (error) {
      console.error("Failed to verify provider:", error);
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      await axiosInstance.put(`/admin/users/${userId}/toggle-status`);
      fetchAllUsers();
    } catch (error) {
      console.error("Failed to toggle user status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-white shadow-md p-6 hidden md:flex md:flex-col md:justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1 text-purple-600">Admin Panel</h2>
          <p className="text-sm text-gray-400 mb-6">{user.name}</p>

          <ul className="space-y-3 text-gray-700">
            <li
              onClick={() => setTab("providers")}
              className={`cursor-pointer ${tab === "providers" ? "font-semibold text-purple-600" : ""}`}
            >
              Pending Providers
              {pendingProviders.length > 0 && (
                <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                  {pendingProviders.length}
                </span>
              )}
            </li>
            <li
              onClick={() => setTab("users")}
              className={`cursor-pointer ${tab === "users" ? "font-semibold text-purple-600" : ""}`}
            >
              All Users
            </li>
            <li
              onClick={() => setTab("bookings")}
              className={`cursor-pointer ${tab === "bookings" ? "font-semibold text-purple-600" : ""}`}
            >
              All Bookings
            </li>
          </ul>
        </div>

        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline text-left">
          Logout
        </button>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Pending Verifications</h3>
            <p className="text-2xl font-bold">{pendingProviders.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-2xl font-bold">{allUsers.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Total Bookings</h3>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </div>
        </div>

        {/* ================= PENDING PROVIDERS TAB ================= */}
        {tab === "providers" && (
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Pending Provider Verifications</h2>

            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : pendingProviders.length === 0 ? (
              <p className="text-gray-400 text-sm">No pending providers</p>
            ) : (
              <div className="space-y-3">
                {pendingProviders.map((p) => (
                  <div key={p._id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-gray-500">{p.email}</p>
                    </div>
                    <button
                      onClick={() => handleVerify(p._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Verify
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ALL USERS TAB ================= */}
        {tab === "users" && (
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">All Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((u) => (
                    <tr key={u._id} className="border-t">
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.role}</td>
                      <td className="p-3">
                        <span className={u.isDisabled ? "text-red-500" : "text-green-600"}>
                          {u.isDisabled ? "Disabled" : "Active"}
                        </span>
                      </td>
                      <td className="p-3">
                        {u.role !== "Admin" && (
                          <button
                            onClick={() => handleToggleStatus(u._id)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {u.isDisabled ? "Enable" : "Disable"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= ALL BOOKINGS TAB ================= */}
        {tab === "bookings" && (
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">All Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Provider</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id} className="border-t">
                      <td className="p-3">{b.customer?.name}</td>
                      <td className="p-3">{b.provider?.name}</td>
                      <td className="p-3">{new Date(b.date).toLocaleString()}</td>
                      <td className="p-3">{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;