import CancelOrderList from "@/components/adminDashboard/OrderList/CancelOrderList";

export async function generateMetadata() {
  return {
    title: "Cancel Order",
  };
}
const CancelOrderPage = () => {
  return <CancelOrderList />;
};

export default CancelOrderPage;
