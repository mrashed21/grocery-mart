import Image from "next/image";
import logo from "./../../../public/image/logo.png";
import { CiLocationOn } from "react-icons/ci";
const TopNavBar = () => {
  return (
    <div>
      {/* logo */}
      <div className="flex items-center gap-1">
        <Image src={logo} width={40} height={40}></Image>
        <h2 className="text-[#385C5D] font-abhaya text-2xl">Grocery Mart</h2>
      </div>
      {/* location */}
      <div className="">
        <p>Location</p>
        <p><span><CiLocationOn /></span> </p>
      </div>
    </div>
  );
};

export default TopNavBar;
