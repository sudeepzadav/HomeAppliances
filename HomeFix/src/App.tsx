import { useState } from "react";
import { Route, Routes, useLocation } from "react-router";
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

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const App = () => {
  const [, setUser] = useState<any>(getStoredUser());
  const { pathname } = useLocation();


  const hideLayout = pathname === "/login" || pathname === "/signup";

  return (
    <div>
      {!hideLayout && <Navbar />}

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

        <Route path="/login" element={<Auth setUser={setUser} />} />
        <Route path="/signup" element={<Auth setUser={setUser} />} />

        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;