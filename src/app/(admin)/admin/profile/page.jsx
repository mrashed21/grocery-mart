import AdminProfile from "@/components/adminDashboard/AdminProfile/AdminProfile";
export async function generateMetadata() {
  return {
    title: "Admin Profile",
  };
}
const AdminProfilePage = () => {
  return <AdminProfile />;
};

export default AdminProfilePage;
