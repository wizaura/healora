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
  avatar?: string | null;
};

export default function ReviewsSection() {

  const {
    data: reviews = [],
    isLoading,
  } = useQuery<Review[]>({

    queryKey: ["reviews"],

    queryFn: () =>
      api.get("/reviews")
        .then((res) => res.data),

    retry: false,
  });

  useEffect(() => {

    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });

  }, []);

  if (
    isLoading ||
    !reviews.length
  ) return null;

  const ReviewCard = ({
    item,
    index,
  }: {
    item: Review;
    index: number;
  }) => (

    <div
      key={index}

      data-aos="fade-up"

      data-aos-delay={
        150 + (index % reviews.length) * 100
      }

      className="
        group relative

        w-[420px]
        shrink-0

        rounded-tl-4xl
        rounded-br-4xl
        rounded-tr-md
        rounded-bl-md

        border-2 border-navy/50

        bg-white

        p-8

        shadow-[0_25px_50px_-20px_rgba(0,0,0,0.25)]

        transition-all duration-500

        hover:-translate-y-2
        hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.35)]
        hover:ring-1
        hover:ring-wellness-accent/30
      "
    >

      {/* AVATAR */}

      <div
        className="
          absolute z-50

          -top-6 left-8

          h-14 w-14

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

              bg-navy

              text-sm font-semibold
              text-white
            "
          >

            {item.name?.charAt(0)}

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

                ? `
                    fill-wellness-accent
                    text-wellness-accent
                  `

                : `
                    text-gray-300
                  `
            }
          />

        ))}

      </div>

      {/* REVIEW */}

      <p
        className="
          mt-4

          line-clamp-5

          text-sm leading-relaxed

          text-navy/70
        "
      >

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
          {item.avatar
            ? "Google Review"
            : "Healora Review"}
        </p>

      </div>

    </div>
  );

  return (

    <section
      data-aos="fade-up"

      className="
        m-4

        overflow-hidden

        rounded-2xl

        bg-gradient-to-b
        from-wellness-bg
        via-white
        to-wellness-bg

        py-16
      "
    >

      <div className="mx-auto max-w-7xl px-6">

        {/* =====================================================
           HEADER
           ===================================================== */}

        <div
          className="
            mb-16

            grid grid-cols-1 gap-8

            md:grid-cols-2
            md:items-center
          "
        >

          {/* LEFT */}

          <h2
            data-aos="fade-up"

            className="
              break-words

              text-3xl font-semibold

              leading-[1.1]

              text-navy

              sm:text-4xl
              md:text-6xl
            "
          >

            What Our Patients Say

          </h2>

          {/* RIGHT */}

          <div
            data-aos="fade-up"

            data-aos-delay="150"

            className="
              ml-auto

              flex max-w-md
              min-w-0
              flex-col gap-6

              md:items-end
              md:text-right
            "
          >

            <p
              className="
                break-words

                text-sm

                text-navy/70

                sm:text-base
                md:text-lg
              "
            >

              Real experiences from people who trusted Healora
              and improved their health journey.

            </p>

            <CTAButton
              label="View All Reviews"

              href="https://maps.app.goo.gl/ev659LvHxH6hHjMVA"

              variant="light"
            />

          </div>

        </div>

      </div>

      {/* =====================================================
         REVIEWS SLIDER
         ===================================================== */}

      <div className="relative max-w-7xl mx-auto">

        {/* LEFT FADE */}

        <div
          className="
            pointer-events-none

            absolute left-0 top-0 z-10

            h-full w-16

            bg-gradient-to-r
            from-wellness-bg
            to-transparent
          "
        />

        {/* RIGHT FADE */}

        <div
          className="
            pointer-events-none

            absolute right-0 top-0 z-40

            h-full w-16

            bg-gradient-to-l
            from-wellness-bg
            to-transparent
          "
        />

        {/* TRACK */}

        <div className="overflow-x-hidden overflow-y-visible pt-8">
          <div className="flex">


            {/* FIRST TRACK */}

            <div
              className="
            animate-marquee
            
            flex min-w-full
            shrink-0
            gap-8
            
            px-4
            
            hover:[animation-play-state:paused]
            "
            >

              {reviews.map((item, index) => (

                <ReviewCard
                  key={index}
                  item={item}
                  index={index}
                />

              ))}

            </div>

            {/* DUPLICATE TRACK */}

            <div
              className="
            animate-marquee
            
            flex min-w-full
            shrink-0
            gap-8
            
            px-4
            
            hover:[animation-play-state:paused]
            "
            >

              {reviews.map((item, index) => (

                <ReviewCard
                  key={`duplicate-${index}`}
                  item={item}
                  index={index}
                />

              ))}

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}