"use client";

type Props = {
  value: any;
  onChange: (data: any) => void;
};

export default function AddressForm({ value, onChange }: Props) {
  const update = (field: string, val: string) => {
    onChange({ ...value, [field]: val });
  };

  const input =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy";

  const label = "text-xs font-medium text-gray-500 mb-1";

  return (
    <div className="space-y-6">

      {/* CONTACT INFO */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-800">Contact Details</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <p className={label}>Phone Number</p>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={value.phone || ""}
              onChange={(e) => update("phone", e.target.value)}
              className={input}
            />
          </div>

          <div>
            <p className={label}>WhatsApp Number</p>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={value.whatsapp || ""}
              onChange={(e) => update("whatsapp", e.target.value)}
              className={input}
            />
          </div>

        </div>
      </div>

      {/* ADDRESS */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-800">Address</p>

        <div>
          <p className={label}>Address Line 1</p>
          <input
            placeholder="House / Flat / Building"
            value={value.line1 || ""}
            onChange={(e) => update("line1", e.target.value)}
            className={input}
          />
        </div>

        <div>
          <p className={label}>Address Line 2</p>
          <input
            placeholder="Street / Area (Optional)"
            value={value.line2 || ""}
            onChange={(e) => update("line2", e.target.value)}
            className={input}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className={label}>City</p>
            <input
              placeholder="City"
              value={value.city || ""}
              onChange={(e) => update("city", e.target.value)}
              className={input}
            />
          </div>

          <div>
            <p className={label}>State</p>
            <input
              placeholder="State / Province"
              value={value.state || ""}
              onChange={(e) => update("state", e.target.value)}
              className={input}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className={label}>Postal Code</p>
            <input
              placeholder="PIN / ZIP"
              value={value.zip || ""}
              onChange={(e) => update("zip", e.target.value)}
              className={input}
            />
          </div>

          <div>
            <p className={label}>Country</p>
            <input
              placeholder="Country"
              value={value.country || ""}
              onChange={(e) => update("country", e.target.value)}
              className={input}
            />
          </div>
        </div>
      </div>
    </div>
  );
}