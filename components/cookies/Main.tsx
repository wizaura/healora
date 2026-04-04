"use client";

import Link from "next/link";

export default function CookiePolicy() {
  return (
    <div className="bg-white">

      {/* HEADER */}
      <section className="bg-gradient-to-b from-white to-wellness-bg py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center pt-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-navy-dark">
            Cookie Policy
          </h1>

          <p className="mt-4 text-sm text-navy/60">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mt-6 text-navy/90 max-w-2xl mx-auto text-md leading-relaxed">
            This Cookie Policy explains how Healora Wellness Centre uses cookies
            and similar technologies when you use our website and telehealth
            platform.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-14 text-md leading-relaxed text-navy/80">

          <Section title="What Are Cookies">
            <p>
              Cookies are small text files placed on your device when you visit
              a website. Cookies help websites function properly, improve user
              experience, and provide information about how users interact with
              the website.
            </p>
          </Section>

          <Section title="How Healora Uses Cookies">
            <ul className="list-disc pl-5 space-y-2">
              <li>To enable secure login and account access</li>
              <li>To manage appointment booking and session functionality</li>
              <li>To remember user preferences</li>
              <li>To understand website usage and improve services</li>
              <li>To maintain security and prevent fraud</li>
            </ul>
          </Section>

          <Section title="Types of Cookies We Use">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for login, booking, and platform functionality.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the platform.</li>
              <li><strong>Functionality Cookies:</strong> Remember user preferences and settings.</li>
              <li><strong>Marketing Cookies:</strong> Used only with user consent for communication and outreach.</li>
            </ul>
          </Section>

          <Section title="Consent for Cookies">
            <p>
              In accordance with the Digital Personal Data Protection Act, 2023
              (India), Healora obtains user consent before placing non-essential
              cookies on your device. You may accept, reject, or customise your
              cookie preferences through our cookie banner.
            </p>
          </Section>

          <Section title="Third-Party Cookies">
            <p>
              Healora may use trusted third-party services that may place cookies
              on your device, including payment gateways, analytics providers,
              and customer support tools. These third parties have their own
              privacy and cookie policies.
            </p>
          </Section>

          <Section title="Managing Cookies">
            <p>
              You can manage or disable cookies through your browser settings.
              However, disabling essential cookies may affect the functionality
              of the platform, including login and appointment booking.
            </p>
          </Section>

          <Section title="Cookie Retention">
            <ul className="list-disc pl-5 space-y-2">
              <li>Session cookies are deleted when you close your browser.</li>
              <li>Persistent cookies remain for a limited period.</li>
              <li>Cookies are retained for a maximum of 12 months unless required for security or legal purposes.</li>
            </ul>
          </Section>

          <Section title="Updates to This Policy">
            <p>
              Healora may update this Cookie Policy from time to time in
              accordance with legal or operational requirements. Continued use
              of the platform constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have any questions about this Cookie Policy, please contact
              Healora Wellness Centre through our contact page.
            </p>

            <Link
              href="/contact"
              className="mt-4 inline-block text-teal-600 font-medium hover:underline"
            >
              Contact Support
            </Link>
          </Section>

        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-navy-dark">
        {title}
      </h2>
      {children}
    </div>
  );
}