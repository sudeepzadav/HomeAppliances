import { IoIosHome } from "react-icons/io";
import { GrSend } from "react-icons/gr";
import { socialMediaLinks } from "../../Constants/socialLInks";
import { ourServices, quickLinks } from "../../Constants/footerLink";

const Footer = () => {
  return (
    <footer className="bg-primary text-red-300">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 p-10">
        
        {/* Left Section */}
        <div className="md:col-span-2">
          <div className="flex items-center text-white font-bold gap-2">
            <IoIosHome className="text-2xl" />
            <h2 className="text-xl">HomeFix</h2>
          </div>

          <p className="mt-3 text-sm leading-6">
            Your trusted partner for home appliance repair and maintenance
            services. We are just a call away!
          </p>

          {/* Social Media */}
          <ul className="flex gap-4 mt-5">
            {socialMediaLinks.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer w-10 h-10 rounded-full bg-gray-300/50 flex items-center justify-center 
                hover:bg-white hover:text-black transition transform hover:scale-105"
              >
                <item.icon />
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((item) => (
              <li
                key={item.id}
                className="hover:text-white cursor-pointer transition"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Our Services</h3>
          <ul className="space-y-2">
            {ourServices.map((item) => (
              <li
                key={item.id}
                className="hover:text-white cursor-pointer transition"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Subscribe</h3>

          <p className="text-sm">
            Subscribe to get offers and tips on appliance care.
          </p>

          <div className="flex items-center mt-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 text-black outline-none border border-white rounded-l-lg bg-primary/50"
            />

            <button className="bg-blue-600 border border-gray-400 p-2 rounded-r-md hover:bg-white hover:text-black transition ">
              <GrSend/>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-5 py-4 border-t border-gray-600 text-sm flex justify-between">
        <span>&copy; {new Date().getFullYear()} HomeFix. All rights reserved.</span>
        <span>Privacy policy &copy; Terms & Conditions</span>
      </div>
    </footer>
  );
};

export default Footer;