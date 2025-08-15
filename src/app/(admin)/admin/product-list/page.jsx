import ProductListTable from "@/components/adminDashboard/Product/ProductList/ProductListTable";

export async function generateMetadata() {
  return {
    title: "Product List",
  };
}
const ProductListPage = () => {
  return <ProductListTable />;
};

export default ProductListPage;
