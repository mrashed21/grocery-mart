import Contain from "@/components/common/Contain";
import Home from "@/components/frontend/Home/Home";
import NavMenu from "@/components/shared/NavMenu";

const HomePage = () => {
  return (
    <Contain>
      <NavMenu />
      <Home />
    </Contain>
  );
};

export default HomePage;
