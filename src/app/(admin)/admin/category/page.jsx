import AdminCategory from "@/components/adminDashboard/AdminCategory/AdminCategory";
export async function generateMetadata() {
  return {
    title: "Category",
  };
}
const AdminCategoryPage = () => {
  return <AdminCategory />;
};

export default AdminCategoryPage;
