import Contain from "@/components/common/Contain";
import TopNavBar from "@/components/shared/NavBar/TopNavBar";
import UserSideBar from "@/components/userProfile/UserSidebar/UserSideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen font-nunito">
      <TopNavBar />
      <Contain className="w-[100%] lg:w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-6">
          {/* Sidebar */}
          <div className="col-span-1">
            <UserSideBar />
          </div>

          {/* Main content area */}
          <div className="col-span-5">
            <div className="w-[97%] mx-auto">{children}</div>
          </div>
        </div>
      </Contain>
    </div>
  );
};

export default MainLayout;
