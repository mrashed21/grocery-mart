import Zone from "@/components/adminDashboard/DeliveryZone/Zone";
export async function generateMetadata() {
  return {
    title: "Zone",
  };
}
const AddZonePage = () => {
  return <Zone />;
};

export default AddZonePage;
