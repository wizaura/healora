"use client";

import { X, BadgeCheck } from "lucide-react";

export default function DoctorViewModal({
  open,
  onClose,
  doctor,
}: {
  open: boolean;
  onClose: () => void;
  doctor: any;
}) {
  if (!open || !doctor) return null;

  const profile = doctor.doctor;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Doctor Details
            </h2>
            <p className="text-sm text-slate-500">
              Professional profile overview
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-6 space-y-8">

          {/* Status */}
          <div className="flex items-center gap-2">
            {profile?.isApproved ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <BadgeCheck size={14} />
                Approved
              </span>
            ) : (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                Pending Approval
              </span>
            )}
          </div>

          {/* Basic Info */}
          <Section title="Basic Information">
            <div className="grid gap-4 md:grid-cols-2">
              <Info label="Name" value={doctor.name} />
              <Info label="Email" value={doctor.email} />
              <Info label="Experience" value={`${profile?.experience || 0} years`} />
              <Info label="Qualification" value={profile?.qualification || "—"} />
            </div>
          </Section>

          {/* Fees */}
          <Section title="Consultation Fees (Multi Currency)">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Info label="INR" value={`₹${profile?.consultationFeeINR || 0}`} />
              <Info label="USD" value={`$${profile?.consultationFeeUSD || 0}`} />
              <Info label="AED" value={`AED ${profile?.consultationFeeAED || 0}`} />
              <Info label="EUR" value={`€${profile?.consultationFeeEUR || 0}`} />
              <Info label="GBP" value={`£${profile?.consultationFeeGBP || 0}`} />
              <Info label="CAD" value={`C$${profile?.consultationFeeCAD || 0}`} />
            </div>
          </Section>

          {/* Specialities */}
          <Section title="Specialities">
            <TagList items={profile?.specialities?.map((s: any) => s.speciality.name)} />
          </Section>

          {/* Sub Specialities */}
          <Section title="Sub Specialities">
            <TagList items={profile?.subSpecialities?.map((s: any) => s.subSpeciality.name)} />
          </Section>

          {/* Mini Specialities */}
          <Section title="Mini Specialities">
            <TagList items={profile?.miniSpecialities?.map((m: any) => m.miniSpeciality.name)} />
          </Section>

          {/* Languages */}
          <Section title="Languages">
            <TagList items={profile?.languages?.map((l: any) => l.language.name)} />
          </Section>

          {/* Bio */}
          <Section title="Bio">
            {profile?.bio ? (
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed">
                {profile.bio}
              </p>
            ) : (
              <EmptyText />
            )}
          </Section>

          {/* Images */}
          <Section title="Images & Documents">
            <div className="grid md:grid-cols-3 gap-6">

              <ImageBox title="Profile" url={profile?.imageUrl} />
              <ImageBox title="Seal" url={profile?.sealUrl} />
              <ImageBox title="Signature" url={profile?.signatureUrl} />

            </div>
          </Section>

          {/* Certificates */}
          <Section title="Certificates">
            {profile?.certificates?.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {profile.certificates.map((c: any) => (
                  <a
                    key={c.id}
                    href={c.fileUrl}
                    target="_blank"
                    className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:bg-gray-50"
                  >
                    {c.fileUrl.includes(".pdf") ? "📄" : (
                      <img src={c.fileUrl} className="w-14 h-14 object-cover rounded-lg border" />
                    )}
                    <span className="text-sm text-blue-600">View Certificate</span>
                  </a>
                ))}
              </div>
            ) : (
              <EmptyText />
            )}
          </Section>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Section({ title, children }: any) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-gray-600">{title}</p>
      {children}
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white">
        {value || "—"}
      </div>
    </div>
  );
}

function TagList({ items = [] }: any) {
  if (!items || items.length === 0) return <EmptyText />;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item: string, i: number) => (
        <span
          key={i}
          className="px-3 py-1 rounded-full text-xs border border-gray-200 bg-gray-50"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ImageBox({ title, url }: any) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 text-center">
      <p className="text-xs text-gray-500 mb-2">{title}</p>
      {url ? (
        <a href={url} target="_blank">
          <img
            src={url}
            className="w-24 h-24 object-cover rounded-lg border mx-auto"
          />
        </a>
      ) : (
        <EmptyText />
      )}
    </div>
  );
}

function EmptyText() {
  return (
    <p className="text-sm text-gray-400 italic">Not provided</p>
  );
}