import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const AdminNavbar = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <nav className="bg-white shadow-md flex items-center justify-between px-4 py-3 h-16">
      {/* Collapse Button */}

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="h-8 w-8 text-gray-700 cursor-pointer"
      >
        {isCollapsed ? <FaBars /> : <FaXmark />}
      </button>

      {/* Other navbar content */}
      <div>
        <span className="font-semibold">Admin Dashboard</span>
      </div>
    </nav>
  );
};

export default AdminNavbar;
