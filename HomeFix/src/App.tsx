import { Route, Routes } from "react-router";
import { ContactUs, Footer, Hero, Hero2, HowItWorks, Navbar, OurServices, WhyChooseUs } from "./Components";
import AboutUs from "./Components/AboutUs";


const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={
          <>
          <Hero />
          <Hero2/>
          <OurServices/>
          <WhyChooseUs/>
          <HowItWorks />
          </>
        } />
        <Route path="about" element={<AboutUs/>} />
        <Route path="contact" element={<ContactUs/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;