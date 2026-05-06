"use client";

import CTAButton from "./CTAButton";

type Props = {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  showButton?: boolean;
  className?: string;
};

export default function CTASection({
  title,
  description,
  buttonLabel = "Get Started",
  buttonHref = "/",
  showButton = true,
  className = "",
}: Props) {
  return (
    <section
      className={`relative m-4 rounded-2xl overflow-hidden border border-gray-200 ${className}`}
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="
          absolute inset-0
          bg-[url('/cta.jpeg')]
          bg-cover bg-top
        "
      />

      {/* OVERLAY (important for text readability) */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-[-0.02em] text-white">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-white/90">
              {description}
            </p>
          )}

          {/* Button */}
          {showButton && (
            <div className="mt-10 flex justify-center">
              <CTAButton
                href={buttonHref}
                label={buttonLabel}
                variant="primary"
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}