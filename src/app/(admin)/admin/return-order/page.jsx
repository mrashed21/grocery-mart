import ReturnOrderList from "@/components/adminDashboard/OrderList/ReturnOrderList";

export async function generateMetadata() {
  return {
    title: "Return Order",
  };
}
const ReturnOrderPage = () => {
  return <ReturnOrderList />;
};

export default ReturnOrderPage;
