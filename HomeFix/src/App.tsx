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

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return user && token ? JSON.parse(user) : null;
  } catch {
    return null;
  }
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
            user ? <Booking user={user} /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/login" element={<Auth setUser={setUser} />} />
        <Route path="/signup" element={<Auth setUser={setUser} />} />

        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;