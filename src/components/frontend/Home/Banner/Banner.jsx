"use client";
import Contain from "@/components/common/Contain";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  // Fetch Banner data
  const {
    data: banners = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/banner`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/banner`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });

  return (
    <Contain>
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        className="w-full"
      >
        {/* <Suspense fallback={<ProductSectionSkeleton />}></Suspense> */}
        {banners?.data?.map((banner, i) => (
          <SwiperSlide>
            <div
              className={`relative w-full h-[170px] md:h-[440px] lg:h-[620px] `}
              key={banner?._id || i}
            >
              {/* Next.js Image component for optimized images */}
              <img
                src={banner?.banner_image}
                alt={`Banner ${i}`}
                placeholder="blur"
                className="w-full h-full "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Contain>
  );
};

export default Banner;
