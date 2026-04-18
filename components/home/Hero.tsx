"use client";

import { useEffect, useState } from "react";
import CTAButton from "../common/CTAButton";
import AOS from "aos";
import "aos/dist/aos.css";

const images = [
  "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2070&auto=format&fit=crop"
];

export default function HomeHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Slideshow
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    // AOS Init
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative m-4 rounded-xl flex min-h-screen items-center justify-center overflow-hidden">

      {/* Slideshow */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            className="h-full w-full object-cover"
            alt="Healthcare background"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Animated SVG Left */}
      <svg
        data-aos="fade-right"
        data-aos-delay="300"
        className="absolute left-6 top-1/2 w-28 -translate-y-1/2 opacity-40 animate-spin-slow"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="40" fill="#38D6C4" />
        {[...Array(10)].map((_, i) => {
          const angle = (i * 360) / 10;
          const x = Number((100 + 55 * Math.cos((angle * Math.PI) / 180)).toFixed(2));
          const y = Number((100 + 55 * Math.sin((angle * Math.PI) / 180)).toFixed(2));
          return <circle key={i} cx={x} cy={y} r="7" fill="#A8F3D6" />;
        })}
      </svg>

      {/* Animated SVG Right */}
      <svg
        data-aos="fade-left"
        data-aos-delay="300"
        className="absolute right-6 top-1/2 w-28 -translate-y-1/2 opacity-40 animate-float"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="35" fill="#A8F3D6" />
        {[...Array(10)].map((_, i) => {
          const angle = (i * 360) / 10;
          const x = Number((100 + 55 * Math.cos((angle * Math.PI) / 180)).toFixed(2));
          const y = Number((100 + 55 * Math.sin((angle * Math.PI) / 180)).toFixed(2));
          return <circle key={i} cx={x} cy={y} r="7" fill="#A8F3D6" />;
        })}
      </svg>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:mt-12 text-white">

        {/* Social proof */}
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full bg-white/90 backdrop-blur px-4 py-2 shadow-sm"
        >
          <div className="flex -space-x-2">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" className="h-7 w-7 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="h-7 w-7 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/women/68.jpg" className="h-7 w-7 rounded-full border-2 border-white" />
          </div>
          <span className="text-sm text-navy">20,000+ happy patients served!</span>
        </div>

        {/* Heading */}
        <h1
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
          className="text-5xl md:text-7xl font-medium leading-[1.15] tracking-[-0.02em]"
        >
          Wellness starts with care
          <br />
          that really listens.
        </h1>

        {/* CTA */}
        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="mt-10 flex justify-center"
        >
          <CTAButton href="/doctors" label="Book an Appointment" />
        </div>
      </div>
    </section>
  );
}