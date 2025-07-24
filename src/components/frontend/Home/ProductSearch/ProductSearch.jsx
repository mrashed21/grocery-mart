import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import productData from "./../../../../../public/productData.json";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const getRandomProducts = (count) => {
    const shuffled = [...productData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleInputFocus = () => {
    setDisplayedProducts(getRandomProducts(10));
    setShowResults(true);
  };

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = productData.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedProducts(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
      setDisplayedProducts([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest(".product-search-container") === null &&
        showResults
      ) {
        setShowResults(false);
        setSearchTerm("");
        setDisplayedProducts([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  return (
    <div className="product-search-container relative">
      <div className="relative flex flex-grow w-full lg:w-96">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-white border border-[#0000001A] text-[#0000004D] py-2 px-3 lg:py-3 lg:px-[18px] rounded-[5px] lg:rounded-[10px] text-sm w-full"
          value={searchTerm}
          onFocus={handleInputFocus}
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

      {showResults && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-72 overflow-y-auto">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product?.slug}`}
                className="flex items-center p-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded mr-3"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center mt-1 ">
                    <TbCurrencyTaka className="text-sm" />
                    {product.price?.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
