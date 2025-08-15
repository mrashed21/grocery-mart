import CreateStaffRole from "@/components/adminDashboard/StaffRole/CreateStaffRole";
export async function generateMetadata() {
  return {
    title: "Add Staff Role",
  };
}
const StaffRolePage = () => {
  return <CreateStaffRole />;
};

export default StaffRolePage;
