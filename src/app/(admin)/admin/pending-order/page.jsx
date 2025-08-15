import PendingOrderList from "@/components/adminDashboard/OrderList/PendingOrderList";

export async function generateMetadata() {
  return {
    title: "Pending Order",
  };
}

const OrderListPage = () => {
  return <PendingOrderList />;
};

export default OrderListPage;
