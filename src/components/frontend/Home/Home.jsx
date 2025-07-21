import AllProducts from "./AllProducts/AllProducts";
import ProductPage from "./AllProducts/ProductPage";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";

const Home = () => {
  return (
    <div className="font-nunito">
      <Banner />
      {/* <Categories />
      <AllProducts /> */}
      <ProductPage/>
    </div>
  );
};

export default Home;
