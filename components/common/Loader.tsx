"use client";

export default function Loader({
  fullScreen = false,
}: {
  fullScreen?: boolean;
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4
        ${fullScreen ? "fixed inset-0 bg-black/70 backdrop-blur-sm z-50" : "py-10"}
      `}
    >
      {/* LOGO */}
      <div className="relative bg-navy/40 rounded-full">
        <img
          src="/logoq.png"
          alt="Healora"
          className="h-20 w-auto rounded-full"
        />

        {/* Spinner ring */}
        <div className="absolute inset-0 rounded-full border-3 border-navy border-t-transparent animate-spin opacity-70" />
      </div>

      {/* Optional text */}
      <p className="text-sm text-gray-200 animate-pulse">
        Loading...
      </p>
    </div>
  );
}