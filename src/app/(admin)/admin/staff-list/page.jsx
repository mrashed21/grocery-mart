import AllStaff from "@/components/adminDashboard/StaffRole/AllStaff";

export async function generateMetadata() {
  return {
    title: "Staff List",
  };
}
const StaffListPage = () => {
  return <AllStaff />;
};

export default StaffListPage;
