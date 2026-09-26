import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import {
  ContactUs,
  Footer,
  Hero,
  Hero2,
  HowItWorks,
  Navbar,
  OurServices,
  WhyChooseUs,
} from "./Components";
import AboutUs from "./Components/AboutUs";
import Auth from "./Pages/auth";
import Booking from "./Pages/Booking";
import CustomerDashboard from "./Pages/CustomerDashboard";
import ProviderDashboard from "./Pages/ProviderDashboard";
import AdminDashboard from "./Pages/AdminDashboard";

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return user && token ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const hasRole = (user: any, role: string) =>
  !!user && typeof user.role === "string" && user.role.trim().toLowerCase() === role.toLowerCase();

const App = () => {
  const [user, setUser] = useState<any>(getStoredUser());
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 🔍 DIAGNOSTIC LOG — remove once the bug is confirmed/fixed
  console.log("App render — user:", user, "pathname:", pathname);

  const hideLayout = pathname === "/login" || pathname === "/signup";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const getDashboardRedirect = () => {
    if (!user) return <Navigate to="/login" replace />;
    if (hasRole(user, "Admin")) return <Navigate to="/admin-dashboard" replace />;
    if (hasRole(user, "Provider")) return <Navigate to="/provider-dashboard" replace />;
    return <Navigate to="/booking" replace />;
  };

  return (
    <div>
      {!hideLayout && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Hero2 />
              <OurServices />
              <WhyChooseUs />
              <HowItWorks />
            </>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/booking"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : hasRole(user, "Customer") ? (
              <Booking user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/provider-dashboard"
          element={
            hasRole(user, "Provider") ? (
              <ProviderDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            hasRole(user, "Admin") ? (
              <AdminDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/my-bookings"
          element={
            hasRole(user, "Customer") ? (
              <CustomerDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={user ? getDashboardRedirect() : <Auth setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={user ? getDashboardRedirect() : <Auth setUser={setUser} />}
        />

        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;