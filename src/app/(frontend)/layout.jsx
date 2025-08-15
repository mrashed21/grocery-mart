import Cart from "@/components/frontend/Cart/Cart";
import MobileCart from "@/components/frontend/Cart/MobileCart";
import Footer from "@/components/shared/Footer/Footer";
import TopNavBar from "@/components/shared/NavBar/TopNavBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="sticky z-50 -top-2">
        <TopNavBar />
      </div>
      <section>
        <Cart />
        <MobileCart />
      </section>
      <main className="min-h-screen">{children}</main>
      <section>
        {" "}
        <Footer />
      </section>
    </>
  );
};

export default MainLayout;
