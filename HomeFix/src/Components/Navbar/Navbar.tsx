import { useState } from "react";
import { navList } from "../../Constants/navlist";
import { HiDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { IoIosHome } from "react-icons/io";
import { Link } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-30">
      {/* Navbar Container */}
      <div className="flex items-center justify-between px-5 py-4 lg:px-10">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer flex items-center text-semibold">
          <IoIosHome className="text-primary" />
          <p>
            Home<span className="text-primary">Fix</span>
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navList.map((item) => (
              <li key={item.id} className="relative group">
                <Link
                  to={item.path}
                  className="text-lg hover:text-blue-600 transition"
                >
                  {item.name}
                </Link>

                {item.children && (
                  <ul className="absolute left-0 top-full hidden min-w-50 rounded-lg bg-white shadow-lg group-hover:block">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={child.path}
                          className="block px-4 py-2 hover:bg-blue-600 hover:text-white"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Button */}
          <button className="rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Call Us: 9801234567
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <RxCross2 /> : <HiDotsVertical />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-5 pb-5">
          <ul className="flex flex-col gap-2">
            {navList.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer rounded-lg px-3 py-2 text-lg hover:bg-blue-600 hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button className="mt-4 w-full rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition">
            Call Us: 9801234567
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
