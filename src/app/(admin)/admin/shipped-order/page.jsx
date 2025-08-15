import ShippedOrderList from "@/components/adminDashboard/OrderList/ShippedOrderList";

export async function generateMetadata() {
  return {
    title: "Shipped Order",
  };
}
const ShippedOrderPage = () => {
  return <ShippedOrderList />;
};

export default ShippedOrderPage;
