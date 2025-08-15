import CustomerList from "@/components/adminDashboard/CustomerList/CustomerList";
export async function generateMetadata() {
  return {
    title: "Customer List",
  };
}
const CustomerListPage = () => {
  return <CustomerList />;
};

export default CustomerListPage;
