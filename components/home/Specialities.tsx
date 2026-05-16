"use client";

import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import CTAButton from "../common/CTAButton";
import SpecialityCard from "../common/SpecialitiesCard";
import { getActiveSpecialities } from "@/lib/specialities.api";
import AOS from "aos";
import "aos/dist/aos.css";
import MainSpecialityCard from "../common/HomeSpecialityCard";

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

    const handleScroll = () => {

      if (window.innerWidth < 768) return;

      if (
        !sectionRef.current ||
        !trackRef.current
      ) return;

      const section =
        sectionRef.current;

      const track =
        trackRef.current;

      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const totalScroll =
        rect.height - viewportHeight;

      const current =
        Math.min(
          Math.max(-rect.top, 0),
          totalScroll
        );

      const progress =
        totalScroll > 0
          ? current / totalScroll
          : 0;

      /* =====================================
         PERFECT TRACK WIDTH
         ===================================== */

      const maxTranslate =
        Math.max(
          track.scrollWidth -
          track.clientWidth,
          0
        );

      const translateX =
        progress * maxTranslate;

      track.style.transform =
        `translate3d(-${translateX}px,0,0)`;
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };

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
        py-8 md:py-4
        px-4 md:px-6
        md:h-[250vh]
      "
    >
      {/* Sticky viewport */}
      <div className="relative md:sticky md:top-10 lg:top-25 overflow-hidden mb-6">

        {/* HEADER */}
        <div className="mx-auto max-w-7xl px-2 md:px-4 pt-10 md:pt-12 pb-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 md:items-center">

            {/* LEFT TITLE */}
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-navy-dark leading-[1.1]"
            >
              Trusted Doctors for
              <br />
              Every Speciality.
            </h2>

            {/* RIGHT CONTENT */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-col gap-6 md:items-end md:text-right max-w-md ml-auto"
            >
              <p className="text-navy/80 text-base md:text-lg">
                Modern medical services designed around your
                health, comfort, and recovery.
              </p>

              <div data-aos="zoom-in" data-aos-delay="300">
                <CTAButton
                  label="View All Specialities"
                  href="/specialities"
                  variant="primary"
                />
              </div>
            </div>

          </div>
        </div>

        {/* CARDS */}
        <div className="relative lg:mt-8 max-w-7xl mx-auto">

          {/* MOBILE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden max-w-6xl mx-auto px-2">
            {services.map((s: any, index: number) => (
              <div
                key={s.id}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
                className="w-full"
              >
                <MainSpecialityCard
                  name={s.name}
                  slug={s.slug}
                  imageUrl={s.overview?.images?.image1?.url}
                  aosDelay={index * 100}
                />
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div
            className="
              hidden md:block

              overflow-hidden
            "
          >
            <div
              ref={trackRef}
              className="
                flex gap-8

                px-4 md:px-2

                py-4

                will-change-transform

                transition-transform
                duration-150
                ease-out
            "
            >
              {services.map((s: any, index: number) => (
                <div
                  key={s.id}
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                  className="
                    flex-shrink-0

                    w-[320px]
                    lg:w-[360px]
                    xl:w-[380px]
                  "
                >
                  <MainSpecialityCard
                    name={s.name}
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