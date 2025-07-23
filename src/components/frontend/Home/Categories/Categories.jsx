"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  // Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Contain from "@/components/common/Contain";
import CategorySkeleton from "@/components/Skeleton/CategorySkeleton";
import { useRef, useState } from "react";

const Categories = ({ onCategorySelect, selectedCategory }) => {
  // Fetch category data
  //   const { data: categoryTypes = [], isLoading } = useQuery({
  //     queryKey: [`/api/v1/category`],
  //     queryFn: async () => {
  //       try {
  //         const res = await fetch(`${BASE_URL}/category`, {
  //           credentials: "include",
  //         });

  //         if (!res.ok) {
  //           const errorData = await res.text();
  //           throw new Error(
  //             `Error: ${res.status} ${res.statusText} - ${errorData}`
  //           );
  //         }

  //         const data = await res.json();
  //         return data;
  //       } catch (error) {
  //         console.error("Fetch error:", error);
  //         throw error;
  //       }
  //     },
  //   });
  const [loading, isLoading] = useState(false);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const categoryData = [
    {
      id: 1,
      name: "All Products",
      image: "https://i.ibb.co/ccWPNqC8/image-2954.png",
    },
    {
      id: 2,
      name: "Vegetables",
      image: "https://i.ibb.co/Cpbqfgkg/image-2865.png",
    },
    {
      id: 3,
      name: "Fruits",
      image: "https://i.ibb.co/hJ4C5ZKG/image-2866.png",
    },
    {
      id: 4,
      name: "Fish",
      image: "https://i.ibb.co/CKQp28tb/image-2873.png",
    },
    {
      id: 5,
      name: "Meat",
      image: "https://i.ibb.co/twWMK876/image-2875.png",
    },
    {
      id: 6,
      name: "Bakery",
      image: "https://i.ibb.co/cS0xztq0/image-2896.png",
    },
  ];

  const totalSlides = categoryData.length;
  return (
    <Contain>
      <div className="lg:mb-28">
        <div>
          <h2 className="text-xl lg:text-4xl text-[#084C4E] font-nunito font-semibold my-3 lg:my-10">
            Featured Categories
          </h2>
        </div>

        <div className="sm:mx-10 relative mb-20">
          {!isLoading ? (
            <CategorySkeleton />
          ) : (
            <div className="relative">
              {/* Buttons */}
              <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10">
                <div className="swiper-button-prev !w-9 !h-9 after:!text-xl font-extrabold after:!text-[#084C4E]" />
              </div>
              <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10">
                <div className="swiper-button-next !w-9 !h-9 after:!text-xl font-extrabold after:!text-[#084C4E]" />
              </div>

              {/* Swiper */}
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                breakpoints={{
                  0: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 5, spaceBetween: 30 },
                }}
                grabCursor
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                keyboard
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
              >
                {categoryData.map((category, i) => (
                  <SwiperSlide key={`${category.name}-${i}`}>
                    <div
                      onClick={() => onCategorySelect(category.name)}
                      className={`cursor-pointer rounded-lg shadow border w-[150px]     lg:w-auto ${
                        selectedCategory === category.name
                          ? "border-[#FF6B4F] border-2"
                          : "border-[#00000014]"
                      }`}
                    >
                      <div className="h-[80px] lg:h-[180px]">
                        <img
                          src={category.image}
                          alt={`Category ${i}`}
                          className="w-full h-full rounded-md"
                        />
                      </div>
                      <div className="bg-[#D9D9D94D] py-3.5 w-full text-[#084C4E] text-center font-bold transition-all duration-300">
                        {category.name}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </Contain>
  );
};

export default Categories;
