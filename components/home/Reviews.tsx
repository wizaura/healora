"use client";

import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

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
      className="bg-gradient-to-b from-white via-white to-wellness-bg py-24 m-4 rounded-2xl"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="mb-20 text-center">
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl font-semibold text-navy md:text-5xl"
          >
            What Our Patients Say
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-4 text-navy/70 text-lg"
          >
            Real experiences from people who trusted Healora
          </p>
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
              <div className="absolute z-10 -top-6 left-8 h-14 w-14 rounded-full bg-wellness-bg p-1 shadow-md">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-full w-full rounded-full object-cover"
                />
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
                <p className="text-xs text-navy/60">
                  Google Review
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}