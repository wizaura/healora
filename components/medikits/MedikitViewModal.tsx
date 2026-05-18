"use client";

import { X } from "lucide-react";

export default function MedikitViewModal({
  data,
  onClose,
}: any) {

  return (

    <div
      onClick={onClose}

      className="
        fixed inset-0 z-50

        flex items-center justify-center

        bg-black/50
        backdrop-blur-sm

        p-4
      "
    >

      <div
        onClick={(e) =>
          e.stopPropagation()
        }

        className="
          grid

          h-[90vh]
          w-full
          max-w-5xl

          overflow-hidden

          rounded-3xl

          bg-white

          shadow-2xl

          md:grid-cols-2
        "
      >

        {/* =====================================================
           LEFT IMAGE
           ===================================================== */}

        <div
          className="
            relative

            h-[280px]

            md:h-full
          "
        >

          <img
            src={data.imageUrl}

            className="
              h-full
              w-full

              object-cover
            "
          />

          {/* OVERLAY */}

          <div
            className="
              absolute inset-0

              bg-gradient-to-t
              from-black/40
              to-transparent
            "
          />

          {/* CLOSE */}

          <button
            onClick={onClose}

            className="
              absolute right-4 top-4

              rounded-full

              bg-white/90

              p-2

              shadow

              transition

              hover:bg-white
            "
          >

            <X size={18} />

          </button>

          {/* MOBILE TITLE */}

          <div
            className="
              absolute bottom-4 left-4 right-4

              text-white

              md:hidden
            "
          >

            <h2 className="text-xl font-semibold">

              {data.title}

            </h2>

          </div>

        </div>

        {/* =====================================================
           RIGHT CONTENT
           ===================================================== */}

        <div
          className="
            flex

            min-h-0
            flex-col
          "
        >

          {/* SCROLLABLE */}

          <div
            className="
              min-h-0
              flex-1

              overflow-y-auto

              p-8

              [scrollbar-width:none]
              [-ms-overflow-style:none]

              [&::-webkit-scrollbar]:hidden
            "
          >

            <div className="space-y-6">

              {/* TITLE */}

              <div>

                <h2
                  className="
                    hidden

                    text-2xl
                    font-semibold

                    md:block
                  "
                >

                  {data.title}

                </h2>

                <p
                  className="
                    mt-2

                    text-sm
                    leading-relaxed

                    text-gray-700
                  "
                >

                  {data.description}

                </p>

              </div>

              {/* MEDICINES */}

              <div>

                <h3
                  className="
                    mb-3
                    font-semibold
                  "
                >

                  Medicines Included

                </h3>

                <div className="flex flex-wrap gap-2">

                  {data.medicines.map(
                    (
                      m: string,
                      i: number
                    ) => (

                      <span
                        key={i}

                        className="
                          rounded-full

                          border border-gray-200

                          bg-gray-50

                          px-3 py-1

                          text-sm
                        "
                      >

                        {m}

                      </span>
                    )
                  )}

                </div>

              </div>

              {/* QUESTIONS */}

              <div>

                <h3
                  className="
                    mb-3
                    font-semibold
                  "
                >

                  Directions to Use

                </h3>

                <div className="space-y-3">

                  {data.questions.map(
                    (q: any) => (

                      <div
                        key={q.id}

                        className="
                          rounded-xl

                          border border-gray-200

                          p-4
                        "
                      >

                        <p
                          className="
                            text-sm
                            font-medium
                          "
                        >

                          {q.question}

                        </p>

                        <p
                          className="
                            mt-1

                            text-sm
                            text-gray-800
                          "
                        >

                          {q.answer}

                        </p>

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
             FIXED FOOTER
             ===================================================== */}

          <div
            className="
              shrink-0

              border-t border-gray-200

              bg-white

              p-6
            "
          >

            <p
              className="
                text-center

                text-xs
                text-gray-700
              "
            >

              Ask Doctor to include Medikits
              (Only for Door to Door Appointments)

              <br />

              or ask about the price of the Medikits

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}