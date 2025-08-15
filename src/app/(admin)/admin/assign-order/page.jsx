import AssignOrderList from "@/components/adminDashboard/OrderList/AssignOrderList";
export async function generateMetadata() {
  return {
    title: "Assign Order",
  };
}
const AssignOrderPage = () => {
  return <AssignOrderList />;
};

export default AssignOrderPage;
