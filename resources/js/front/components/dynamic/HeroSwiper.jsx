import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import HeroSwiperSlide from "./HeroSwiperSlide";

export default function HeroSwiper({slides = [] }) {
  const { t } = useTranslation();

  return (
    <section className="w-full mt-30">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop = {slides.length > 1}
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => (
          <HeroSwiperSlide key={index} {...slide} />
        ))}
      </Swiper>
    </section>
  );
}
