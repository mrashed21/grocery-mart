import AddProduct from "@/components/adminDashboard/Product/AddProduct/AddProduct";
export async function generateMetadata() {
  return {
    title: "Add Product",
  };
}
const AddCategoryPage = () => {
  return <AddProduct />;
};

export default AddCategoryPage;
