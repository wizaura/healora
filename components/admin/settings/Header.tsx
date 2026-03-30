"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "General", href: "/admin/settings" },
  { name: "Fees", href: "/admin/settings#fees" },
  { name: "Contents", href: "/admin/settings#content" },
  { name: "Greeting Banner", href: "/admin/settings#greetings" },
  { name: "FAQs", href: "/admin/settings/faqs" },
];

export default function SettingsHeader() {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex gap-6">
        {tabs.map((tab) => {
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`pb-3 text-sm font-medium border-b-2 transition ${
                active
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}