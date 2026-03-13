import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/auth-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactQueryProvider from "@/providers/react-query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://healorawellnesscentre.com"),

  title: {
    default: "Healora | Online Doctor Consultation & Wellness Platform",
    template: "%s | Healora",
  },

  description:
    "Healora connects patients with verified doctors for online consultations, holistic treatments, and wellness support. Book appointments, explore specialities, and improve your health with trusted professionals.",

  keywords: [
    "online doctor consultation",
    "telemedicine platform",
    "healthcare consultation",
    "homeopathy doctors",
    "online medical advice",
    "health platform India",
    "book doctor appointment online",
  ],

  authors: [{ name: "Healora Wellness Centre" }],

  creator: "Healora",

  openGraph: {
    title: "Healora | Online Doctor Consultation",
    description:
      "Consult trusted doctors online, explore healthcare specialities, and manage your health journey with Healora.",
    url: "https://healorawellnesscentre.com",
    siteName: "Healora",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Healora Healthcare Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Healora | Online Doctor Consultation",
    description:
      "Consult doctors online and improve your health with Healora.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F2147",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">

        <AuthProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <ReactQueryProvider>

              <Navbar />

              <main className="min-h-screen">
                {children}
              </main>

              <Footer />

            </ReactQueryProvider>
          </GoogleOAuthProvider>
        </AuthProvider>

        <Toaster position="top-right" />

      </body>
    </html>
  );
}