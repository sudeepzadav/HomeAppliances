import { useEffect, useRef, useState } from "react";
import { navList } from "../../Constants/navlist";
import { HiDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { IoIosHome } from "react-icons/io";
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router";

type NavbarProps = {
  user: any; // null when logged out
  onLogout: () => void;
};

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Adjust these to match your user object
  const displayName: string = user?.name || user?.fullName || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  // Close the dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const goToLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const goToDashboard = () => {
    setMenuOpen(false);
    setDropdownOpen(false);

    const role = String(user?.role || "").trim().toLowerCase();
    const dashboardRoutes: Record<string, string> = {
      customer: "/my-bookings",
      provider: "/provider-dashboard",
      admin: "/admin-dashboard",
    };
    navigate(dashboardRoutes[role] ?? "/");
  };

  const handleLogout = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    onLogout();
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-30">
      {/* Navbar Container */}
      <div className="flex items-center justify-between px-5 py-4 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold cursor-pointer flex items-center"
        >
          <IoIosHome className="text-primary" />
          <p>
            Home<span className="text-primary">Fix</span>
          </p>
        </Link>

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

          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                  className="flex items-center gap-2 rounded-full border border-gray-300 py-1.5 pl-1.5 pr-3 text-gray-700 hover:border-blue-600 transition"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    {initial}
                  </span>
                  <span className="max-w-30 truncate">{displayName}</span>
                  <FiChevronDown
                    className={`transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
                  >
                    <button
                      role="menuitem"
                      onClick={goToDashboard}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left hover:bg-blue-600 hover:text-white transition"
                    >
                      <MdOutlineDashboard className="text-lg" />
                      Dashboard
                    </button>
                    <button
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-2.5 text-left text-red-600 hover:bg-red-600 hover:text-white transition"
                    >
                      <MdLogout className="text-lg" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={goToLogin}
              className="rounded-full bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Login
            </button>
          )}
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
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-lg hover:bg-blue-600 hover:text-white transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Mobile: Dashboard link (only when logged in) */}
            {user && (
              <li>
                <button
                  onClick={goToDashboard}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-lg hover:bg-blue-600 hover:text-white transition"
                >
                  <MdOutlineDashboard />
                  Dashboard
                </button>
              </li>
            )}
          </ul>

          {/* Mobile buttons: depend on login state */}
          {user ? (
            <div className="mt-4 space-y-3">
              <button
                onClick={handleLogout}
                className="w-full rounded-full border border-gray-300 px-5 py-3 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={goToLogin}
              className="mt-4 w-full rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;