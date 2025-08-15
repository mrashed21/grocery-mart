import UserOrderInfo from "@/components/frontend/UserOrderInfo/UserOrderInfo";
export async function generateMetadata() {
  return {
    title: "Order Info",
  };
}
const UserOrderIinfoPage = () => {
  return <UserOrderInfo />;
};

export default UserOrderIinfoPage;
