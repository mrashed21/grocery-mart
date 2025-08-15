import DeliveredOrderList from "@/components/adminDashboard/OrderList/DeliveredOrderList";
export async function generateMetadata() {
  return {
    title: "Delivered Order",
  };
}
const DeliveryOrderPage = () => {
  return <DeliveredOrderList />;
};

export default DeliveryOrderPage;
