import React from "react";
import { SwiperSlide } from "swiper/react";

export default function HeroSwiperSlide({
  eyebrow,
  title,
  description,
  buttons = [],
}) {
  return (
    <SwiperSlide>
      <div className="bg-linear-to-br from-[#0d8fe8] to-[#38b6ff] text-white h-130 flex items-center justify-center relative">
        <div className="max-w-400 mx-auto px-6 w-full flex justify-center relative z-10">
          <div className="max-w-170 text-center mx-auto">

            {eyebrow && (
              <p className="mb-4 text-[0.85rem] font-extrabold tracking-[1.5px] uppercase text-white/90">
                {eyebrow}
              </p>
            )}

            <h1 className="text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.08] mb-5 font-extrabold tracking-[-1px]">
              {title}
            </h1>

            <p className="text-[1.08rem] leading-[1.75] mb-7 text-white/90 max-w-155 mx-auto">
              {description}
            </p>

            <div className="flex flex-wrap gap-3.5 justify-center">
              {buttons.map((btn, index) => (
                <button
                  key={index}
                  onClick={btn.onClick}
                  className={btn.className}
                >
                  {btn.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        <div className="absolute -right-30 -bottom-20 w-[320px] h-80 bg-white/10 rounded-full blur-xl"></div>
      </div>
    </SwiperSlide>
  );
}
