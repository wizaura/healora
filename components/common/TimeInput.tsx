import { useState } from "react";
import { Clock } from "lucide-react";

const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0")
);

const MINUTES_30 = ["00", "30"];
const MINUTES_60 = ["00"];

export default function CustomTimeInput({
  label,
  value,
  onChange,
  duration = 30,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  duration?: 30 | 60;
}) {
  const [open, setOpen] = useState(false);

  const minutes = duration === 60 ? MINUTES_60 : MINUTES_30;

  return (
    <div className="space-y-2 relative">
      
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Input display */}
      <div
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          w-full px-4 py-3
          rounded-xl border border-gray-200
          bg-white cursor-pointer
          hover:border-gray-300
        "
      >
        <Clock className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-800">
          {value || "Select time"}
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg p-3 max-h-60 overflow-y-auto">
          
          <div className="grid grid-cols-3 gap-2">
            {HOURS.map((h) =>
              minutes.map((m) => {
                const t = `${h}:${m}`;
                const active = value === t;

                return (
                  <button
                    key={t}
                    onClick={() => {
                      onChange(t);
                      setOpen(false);
                    }}
                    className={`
                      px-3 py-2 rounded-lg text-sm
                      ${active
                        ? "bg-navy text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                      }
                    `}
                  >
                    {t}
                  </button>
                );
              })
            )}
          </div>

        </div>
      )}
    </div>
  );
}