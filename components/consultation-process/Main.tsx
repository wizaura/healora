"use client";

import {
  Calendar,
  CreditCard,
  Video,
  FileText,
  Truck,
  AlertCircle,
  Stethoscope,
  Globe,
} from "lucide-react";

export default function ConsultationProcess() {
  return (
    <section className="m-4 rounded-2xl px-6 py-24 bg-gradient-to-b from-white via-white to-wellness-bg">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.15] tracking-[-0.02em] text-navy">
            Consultation Process
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Healora Wellness Centre offers seamless online consultations through
            Google Meet or Zoom, ensuring convenient and effective care from anywhere.
          </p>
        </div>

        {/* PROCESS STEPS */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-center mb-12 text-slate-900">
            How It Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <Card
              icon={<Stethoscope />}
              title="Choose Your Doctor"
              desc="Select a doctor directly or choose a speciality first, then pick the doctor best suited for your condition."
            />

            <Card
              icon={<Calendar />}
              title="Book Appointment"
              desc="Select your preferred date and time. First consultation is 60 minutes, follow-ups are 30 minutes."
            />

            <Card
              icon={<CreditCard />}
              title="Make Payment"
              desc="Use Razorpay for Indian payments and Stripe for international payments."
            />

            <Card
              icon={<Video />}
              title="Attend Consultation"
              desc="Consult via Google Meet or Zoom based on your preference."
            />

            <Card
              icon={<FileText />}
              title="Share Medical Records"
              desc="Upload reports, prescriptions, and images through your profile before consultation."
            />

            <Card
              icon={<Truck />}
              title="Receive Medicines"
              desc="Choose prescription or doorstep delivery based on your preference."
            />

          </div>
        </div>

        {/* PAYMENT OPTIONS */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-center mb-12 text-slate-900">
            Payment Options
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <InfoCard
              title="Option 1: Slot Fee Only"
              desc="Pay the slot fee first and complete consultation payment at least 1 hour before your appointment, otherwise it will be cancelled."
            />

            <InfoCard
              title="Option 2: Full Payment"
              desc="Pay both slot and consultation fees to confirm your appointment immediately."
            />

          </div>
        </div>

        {/* POST CONSULTATION OPTIONS */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-center mb-12 text-slate-900">
            After Consultation Options
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <Card
              icon={<FileText />}
              title="Prescription Only"
              desc="Receive your prescription via email and purchase medicines from nearby stores."
            />

            <Card
              icon={<Truck />}
              title="Doorstep Delivery"
              desc="Get medicines delivered to your home after completing payment."
            />

            <Card
              icon={<Globe />}
              title="Consultation Only"
              desc="Applicable for non-homeopathy services like other specialties."
            />

          </div>
        </div>

        {/* IMPORTANT NOTES */}
        <div>
          <h2 className="text-3xl font-semibold text-center mb-12 text-slate-900">
            Important Notes
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Note text="Consultation charges must be paid in advance to confirm appointments." />
            <Note text="Medicine and shipping charges must be paid before dispatch." />
            <Note text="Consultation and slot fees are non-refundable." />
            <Note text="Medicine charges are non-refundable once dispatched." />
            <Note text="Courier delivery depends on availability and external conditions." />
            <Note text="Homeopathic medicines are personalized and not routinely prescribed." />
            <Note text="Emergency prescriptions may be provided at doctor’s discretion." />
            <Note text="Each consultation is charged separately." />

          </div>
        </div>

      </div>
    </section>
  );
}

/* CARD */

function Card({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-4">
      <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
        {icon}
      </div>
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

/* INFO CARD */

function InfoCard({ title, desc }: any) {
  return (
    <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

/* NOTE */

function Note({ text }: any) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
      <AlertCircle className="text-red-500 mt-1" size={18} />
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}