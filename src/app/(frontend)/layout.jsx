import Cart from "@/components/frontend/Cart/Cart";
import MobileCart from "@/components/frontend/Cart/MobileCart";
import Footer from "@/components/shared/Footer/Footer";
import TopNavBar from "@/components/shared/NavBar/TopNavBar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className="sticky z-50 top-0">
        <TopNavBar />
      </div>
      <Cart />
      <MobileCart />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
