import Contain from "@/components/common/Contain";
import Home from "@/components/frontend/Home/Home";
import TopNavBar from "@/components/shared/TopNavBar";

const HomePage = () => {
  return (
    <Contain>
      <TopNavBar />
      <Home />
    </Contain>
  );
};

export default HomePage;
