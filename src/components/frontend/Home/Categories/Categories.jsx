"use client";
import Contain from "@/components/common/Contain";
import CategorySkeleton from "@/components/Skeleton/CategorySkeleton";
import { useRef } from "react";
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

const Categories = ({
  onCategorySelect,
  selectedCategory,
  categoryTypes,
  isLoading,
}) => {
  const swiperRef = useRef(null);
  // Fetch category data

  return (
    <Contain>
      <section className="lg:mb-8">
        {/* start category section */}
        <div>
          <h2 className="text-xl lg:text-4xl text-[#084C4E] font-nunito font-semibold my-3 lg:my-10">
            Featured Categories
          </h2>
        </div>

        <section className="sm:mx-10 relative mb-2 lg:mb-10">
          {isLoading ? (
            <CategorySkeleton />
          ) : (
            <div className="relative">
              {/* Buttons */}
              <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 ">
                <div className="swiper-button-prev !w-9 !h-9 after:!text-xl font-extrabold after:!text-[#084C4E]" />
              </div>
              <div className="absolute right-[-20px] top-1/2 -translate-y-1/2">
                <div className="swiper-button-next !w-9 !h-9 after:!text-xl font-extrabold after:!text-[#084C4E]" />
              </div>

              {/* Swiper */}
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                  0: { slidesPerView: 4, spaceBetween: 10 },
                  768: { slidesPerView: 4, spaceBetween: 15 },
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
                {categoryTypes?.data?.map((category, i) => (
                  <SwiperSlide key={`${category._id}`}>
                    <div
                      onClick={() => onCategorySelect(category?.category_name)}
                      className={`cursor-pointer rounded-lg shadow border w-[80px] lg:w-auto ${
                        selectedCategory === category?.category_name
                          ? "border-[#FF6B4F] border-2"
                          : "border-[#00000014]"
                      }`}
                    >
                      <div className="h-[80px] lg:h-[150px]">
                        <img
                          src={category?.category_image}
                          alt={`Category ${i}`}
                          className="w-full h-full rounded-md"
                        />
                      </div>
                      <div className="bg-[#D9D9D94D] py-0.5 lg:py-3.5 w-full text-[#084C4E] text-center text-[12px] lg:text-base lg:font-bold transition-all duration-300 ">
                        {category?.category_name}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </section>
      </section>
    </Contain>
  );
};

export default Categories;
