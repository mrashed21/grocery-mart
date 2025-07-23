import AdminSidebar from "@/components/adminDashboard/AdminSidebar/AdminSidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">   <AdminSidebar /></div>
      <div className="min-h-screen col-span-4">{children}</div>
    </div>
  );
};

export default MainLayout;
