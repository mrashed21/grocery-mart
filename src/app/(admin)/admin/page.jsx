import Dasboard from "@/components/adminDashboard/Dashboard/Dasboard";
export async function generateMetadata() {
  return {
    title: "Admin Dashboard",
  };
}
const AdminHome = () => {
  return <Dasboard />;
};

export default AdminHome;
