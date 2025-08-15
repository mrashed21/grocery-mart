import UserOrderTable from "@/components/userProfile/UserOrder/UserOrderTable";

export async function generateMetadata() {
  return {
    title: "My Order",
  };
}
const OrderPage = () => {
  return <UserOrderTable />;
};

export default OrderPage;
