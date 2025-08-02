"use cliient";
import { FiSearch } from "react-icons/fi";
import productData from "./../../../../../public/productData.json";

const ProductSearch = ({ searchTerm, setSearchTerm, setDisplayedProducts }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      const filtered = productData.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedProducts(filtered);
    } else {
      setDisplayedProducts([]);
    }
  };

  return (
    <div className="product-search-container w-full lg:w-96">
      <div className="relative flex flex-grow w-full">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-white border border-[#0000001A] text-[#000000d1] py-2 px-3 lg:py-3 lg:px-[18px] rounded-[5px] lg:rounded-[10px] text-sm w-full"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <span className="absolute inset-y-0 end-0 grid w-8 h-full rounded-r-[5px] lg:w-12 place-content-center">
          <button
            type="button"
            className="bg-[#5E8B8C] text-white p-1 lg:p-[13px] rounded-[5px] lg:rounded-[10px] cursor-pointer"
          >
            <FiSearch className="text-base lg:text-lg text-white" />
          </button>
        </span>
      </div>
    </div>
  );
};

export default ProductSearch;
