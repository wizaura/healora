"use client";

import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import CTAButton from "../common/CTAButton";

type Review = {
  name: string;
  rating: number;
  review: string;
  avatar: string;
};

export default function ReviewsSection() {
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: () => api.get("/reviews").then((res) => res.data),
    retry: false,
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  if (isLoading) return null;

  return (
    <section
      data-aos="fade-up"
      className="bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-16 m-4 rounded-2xl"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-center mb-16">

          {/* LEFT */}
          <h2
            data-aos="fade-up"
            className="text-3xl sm:text-4xl md:text-6xl font-semibold text-navy leading-[1.1] break-words"
          >
            What Our Patients Say
          </h2>

          {/* RIGHT */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="flex flex-col gap-6 md:items-end md:text-right max-w-md ml-auto min-w-0"
          >
            <p className="text-navy/70 text-sm sm:text-base md:text-lg break-words">
              Real experiences from people who trusted Healora and improved their health journey.
            </p>

            {/* CTA BUTTON */}
            <CTAButton
              label="View All Reviews"
              href="https://maps.app.goo.gl/ev659LvHxH6hHjMVA"
              variant="light"
            />
          </div>

        </div>

        {/* REVIEWS */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {reviews.slice(0, 3).map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={150 + index * 100}
              className="
                group relative
                rounded-tl-4xl rounded-br-4xl rounded-tr-md rounded-bl-md bg-white
                p-8 border border-navy/50 border-2
                shadow-[0_25px_50px_-20px_rgba(0,0,0,0.25)]
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.35)]
                hover:ring-1 hover:ring-wellness-accent/30
              "
            >
              {/* AVATAR */}
              <div
                className="
    absolute z-10

    -top-6 left-8

    h-14 w-14

    overflow-hidden

    rounded-full

    bg-wellness-bg

    p-1

    shadow-md
  "
              >

                {item.avatar ? (

                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="
        h-full w-full

        rounded-full

        object-cover
      "
                  />

                ) : (

                  <div
                    className="
        flex h-full w-full
        items-center justify-center

        rounded-full

        bg-gradient-to-br
        from-[#1F2147]
        to-[#2E3363]

        text-lg font-semibold
        text-white
      "
                  >
                    {item.name?.[0]?.toUpperCase()}
                  </div>

                )}

              </div>

              {/* STARS */}
              <div className="mt-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < item.rating
                        ? "fill-wellness-accent text-wellness-accent"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* REVIEW */}
              <p className="mt-4 text-sm leading-relaxed text-navy/70">
                “{item.review}”
              </p>

              {/* DIVIDER */}
              <div className="mt-6 h-px w-full bg-gray-100" />

              {/* USER */}
              <div className="mt-4">
                <p className="font-semibold text-navy">
                  {item.name}
                </p>
                <div
                  className="
    inline-flex items-center gap-1.5

    rounded-full

    bg-navy/5

    px-2.5 py-1

    text-[11px] font-medium

    text-navy/70
  "
                >

                  {item.avatar ? (
                    <>
                      <span className="text-blue-500">
                        ✦
                      </span>

                      Google Review
                    </>
                  ) : (
                    <>
                      <span className="text-teal-500">
                        ♥
                      </span>

                      Healora Review
                    </>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}