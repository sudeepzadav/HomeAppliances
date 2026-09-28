import { useState, type ReactElement } from "react";
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
  !!user &&
  typeof user.role === "string" &&
  user.role.trim().toLowerCase() === role.toLowerCase();

// Only renders children if the user is logged in AND has the required role.
// Logged-out users go to /login; logged-in users with the wrong role go home.
const ProtectedRoute = ({
  user,
  role,
  children,
}: {
  user: any;
  role: string;
  children: ReactElement;
}) => {
  if (!user) return <Navigate to="/login" replace />;
  if (!hasRole(user, role)) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  const [user, setUser] = useState<any>(getStoredUser());
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const hideLayout = pathname === "/login" || pathname === "/signup";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Where to send a logged-in user who visits /login or /signup
  const getDashboardRedirect = () => {
    if (!user) return <Navigate to="/login" replace />;
    if (hasRole(user, "Admin"))
      return <Navigate to="/admin-dashboard" replace />;
    if (hasRole(user, "Provider"))
      return <Navigate to="/provider-dashboard" replace />;
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

        {/* Customer */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute user={user} role="Customer">
              <Booking user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute user={user} role="Customer">
              <CustomerDashboard user={user} />
            </ProtectedRoute>
          }
        />

        {/* Provider */}
        <Route
          path="/provider-dashboard"
          element={
            <ProtectedRoute user={user} role="Provider">
              <ProviderDashboard user={user} />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute user={user} role="Admin">
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
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