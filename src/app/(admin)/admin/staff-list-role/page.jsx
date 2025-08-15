import StaffRoleTable from "@/components/adminDashboard/StaffRole/StaffRoleTable";

export async function generateMetadata() {
  return {
    title: "Staff Role",
  };
}
const StaffListRolePage = () => {
  return <StaffRoleTable />;
};

export default StaffListRolePage;
