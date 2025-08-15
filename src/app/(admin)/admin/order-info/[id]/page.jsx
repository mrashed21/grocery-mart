import OrderInformation from "@/components/adminDashboard/OrderList/OrderInformation";
export async function generateMetadata() {
  return {
    title: "Order Info",
  };
}

const OrderInfoPage = () => {
  return <OrderInformation />;
};

export default OrderInfoPage;
