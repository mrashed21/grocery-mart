"use client";
import Contain from "@/components/common/Contain";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const bannerData = [
    "https://i.ibb.co/pjdjm2Cc/image-2860.png",
    "https://i.ibb.co/pjdjm2Cc/image-2860.png",
    "https://i.ibb.co/pjdjm2Cc/image-2860.png",
    "https://i.ibb.co/pjdjm2Cc/image-2860.png",
    "https://i.ibb.co/pjdjm2Cc/image-2860.png",
  ];
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
        {bannerData?.map((banner, i) => (
          <SwiperSlide>
            <div
              className={`relative w-full h-[170px] md:h-[440px] lg:h-[620px] `}
              key={banner?._id || i}
            >
              {/* Next.js Image component for optimized images */}
              <img
                src={banner}
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
