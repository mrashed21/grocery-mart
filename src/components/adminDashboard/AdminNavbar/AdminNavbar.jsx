import { FaBars, FaUserTie } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const AdminNavbar = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <nav className="bg-white shadow-md flex items-center justify-between px-4 py-3 h-16">
      {/* Collapse Button */}

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="h-12 w-12 text-gray-700 cursor-pointer text-3xl"
      >
        {isCollapsed ? <FaBars /> : <FaXmark />}
      </button>

      {/* Other navbar content */}
      <div className="p-1.5 flex items-center justify-center border-gray-400 rounded-full border w-10 h-10">
        <span className="font-semibold text-3xl  ">
          <FaUserTie />
        </span>
      </div>
    </nav>
  );
};

export default AdminNavbar;
