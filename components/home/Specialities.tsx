"use client";

import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import CTAButton from "../common/CTAButton";
import SpecialityCard from "../common/SpecialitiesCard";
import { getActiveSpecialities } from "@/lib/specialities.api";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServicesScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery({
    queryKey: ["specialities", "home"],
    queryFn: getActiveSpecialities,
    retry: false,   
  });

  const sortedSpecialities = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const exactHomeopathy: typeof data = [];
    const haveHomeopathy: typeof data = [];
    const others: typeof data = [];

    data.forEach((item) => {
      const name = item?.name?.trim().toLowerCase();

      if (name === "homeopathy") {
        exactHomeopathy.push(item);
      } else if (name?.includes("homeopathy")) {
        haveHomeopathy.push(item);
      } else {
        others.push(item);
      }
    });

    return [...exactHomeopathy, ...others, ...haveHomeopathy];
  }, [data]);

  const services = sortedSpecialities.slice(0, 4);

  /* ---------------- AOS INIT ---------------- */
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  /* ---------------- HORIZONTAL SCROLL ---------------- */
  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 768) return;
      if (!sectionRef.current || !trackRef.current) return;

      const section = sectionRef.current;
      const track = trackRef.current;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScroll = rect.height - viewportHeight;

      const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
      const progress = scrolled / totalScroll;

      const maxTranslate =
        track.scrollWidth - window.innerWidth + 160;

      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-aos="fade-up"
      className="
        relative m-4 rounded-xl
        bg-gradient-to-b
        from-wellness-bg
        via-white
        to-wellness-bg
        py-8 md:py-16
        px-6 md:px-0
        md:h-[350vh] md:py-0
      "
    >
      {/* Sticky viewport */}
      <div className="relative md:sticky md:top-0 overflow-hidden mb-6">

        {/* HEADER */}
        <div className="mx-auto max-w-7xl pt-8 md:pt-28 pb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* LEFT TITLE */}
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl font-semibold text-navy-dark leading-tight md:text-6xl"
            >
              Complete Health
              <br />
              Care Solutions.
            </h2>

            {/* RIGHT CONTENT */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-col items-start gap-6 md:items-end md:text-right"
            >
              <p className="max-w-md text-navy/80 text-base md:text-lg">
                Modern medical services designed around your
                health, comfort, and recovery.
              </p>

              <div data-aos="zoom-in" data-aos-delay="300">
                <CTAButton
                  label="View All Specialities"
                  href="/specialities"
                  variant="light"
                />
              </div>
            </div>

          </div>
        </div>

        {/* CARDS */}
        <div className="relative md:mt-24 max-w-7xl mx-auto">

          {/* MOBILE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden max-w-6xl mx-auto">
            {services.map((s: any, index: number) => (
              <div
                key={s.id}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
                className="w-full"
              >
                <SpecialityCard
                  name={s.name}
                  description={s.description}
                  slug={s.slug}
                  imageUrl={s.overview?.images?.image1?.url}
                  aosDelay={index * 100}
                />
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block overflow-hidden">

            <div
              ref={trackRef}
              className="flex gap-6 px-24 py-3 will-change-transform"
            >
              {services.map((s: any, index: number) => (
                <div
                  key={s.id}
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                  className="flex-shrink-0 w-[420px]"
                >
                  <SpecialityCard
                    name={s.name}
                    description={s.description}
                    slug={s.slug}
                    imageUrl={s.overview?.images?.image1?.url}
                  />
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}