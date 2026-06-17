"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    image: "/uel-campus-hero.png",
    label: "Không gian học thuật xanh",
  },
  {
    image: "/uel-campus-hero.png",
    label: "Nền tảng tạp chí học thuật",
  },
  {
    image: "/uel-campus-hero.png",
    label: "Kết nối nghiên cứu và cộng đồng",
  },
];

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = slides[activeIndex];

  function go(delta: number) {
    setActiveIndex((current) => (current + delta + slides.length) % slides.length);
  }

  return (
    <section
      className="relative isolate min-h-[360px] overflow-hidden bg-[#155394]"
      style={{ height: "calc(100dvh - var(--site-header-height, 128px))" }}
      aria-label="Hero slider"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{ backgroundImage: `url(${active.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/52 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="relative z-10 flex h-full items-end px-6 pb-10 md:px-12 lg:px-[76px]">
        <div className="w-full">
          <p className="mb-5 max-w-xl text-sm font-extrabold uppercase text-white/85 md:text-base">
            {active.label}
          </p>
          <div className="flex items-center gap-5">
            <div className="h-[3px] flex-1 bg-white/42">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                className="grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white/6 text-white transition hover:bg-white/16"
                onClick={() => go(-1)}
                aria-label="Previous slide"
              >
                <ChevronLeft size={28} strokeWidth={1.7} />
              </button>
              <button
                className="grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white/6 text-white transition hover:bg-white/16"
                onClick={() => go(1)}
                aria-label="Next slide"
              >
                <ChevronRight size={28} strokeWidth={1.7} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
