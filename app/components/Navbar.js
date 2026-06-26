import { FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";

import SearchBar from "../components/SearchBar";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <PiStudentBold className="text-4xl text-blue-600" />

            <h1 className="text-2xl font-bold text-gray-800">
              Student Management
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">

            {/* Search */}
            <div className="relative flex-1 md:w-80">
              <IoSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
              />
<SearchBar
  placeholder="Search Student..."
  className="flex-1 md:w-80"
/>
            </div>

            {/* Profile */}
            <div className="flex justify-end">
              <FaUserCircle className="text-4xl text-gray-700 cursor-pointer hover:text-blue-600 transition" />
            </div>

          </div>

        </div>

      </div>
    </nav>
  );
}