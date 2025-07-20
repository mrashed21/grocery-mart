import Contain from "@/components/common/Contain";
import Home from "@/components/frontend/Home/Home";
import TopNavBar from "@/components/shared/TopNavBar";

const HomePage = () => {
  return (
    <div className="">
      <div className="bg-[#084C4E0A] pt-6 pb-3.5">
        <TopNavBar />
      </div>
      <Contain>
        <Home />
      </Contain>
    </div>
  );
};

export default HomePage;
