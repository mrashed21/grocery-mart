import AdminLogin from "@/components/adminDashboard/AdminLogin/AdminLogin";
export async function generateMetadata() {
  return {
    title: "Admin login",
  };
}
const AdminLoginPage = () => {
  return <AdminLogin />;
};

export default AdminLoginPage;
