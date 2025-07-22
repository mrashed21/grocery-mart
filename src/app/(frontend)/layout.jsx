import Footer from "@/components/shared/Footer/Footer";
import TopNavBar from "@/components/shared/NavBar/TopNavBar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div>
        <TopNavBar />
      </div>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
