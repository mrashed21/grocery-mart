import AddBanner from "@/components/adminDashboard/AddBanner/AddBanner";
export async function generateMetadata() {
  return {
    title: "Banner",
  };
}
const BannerPage = () => {
  return <AddBanner />;
};

export default BannerPage;
