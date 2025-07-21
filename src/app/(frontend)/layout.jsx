import Footer from "@/components/shared/Footer/Footer";
import TopNavBar from "@/components/shared/NavBar/TopNavBar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className=" pt-3 lg:pt-6 pb-3.5 sticky top-0 z-90 bg-[#084C4E0A] [@supports(backdrop-filter:blur(10px))]:bg-[#084C4E0A]/80 backdrop-blur-sm transition-colors duration-300">
        <TopNavBar />
      </div>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
