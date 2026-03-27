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
      className={`m-4 rounded-3xl bg-gradient-to-br from-white to-white border border-gray-200 px-6 py-20 ${className}`}
    >
      <div className="mx-auto max-w-5xl text-center">
        {/* Title */}
        <h2 className="text-3xl font-medium leading-tight tracking-[-0.02em] text-gray-800 md:text-5xl">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-gray-700">
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
    </section>
  );
}