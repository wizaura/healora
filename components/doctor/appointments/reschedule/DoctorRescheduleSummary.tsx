"use client";

export default function DoctorRescheduleSummary({ appointment }: any) {

    return (
        <section className="relative m-4 rounded-3xl pt-20 pb-12">

            <div className="mx-auto max-w-5xl px-6 text-center space-y-4">

                <span className="inline-block rounded-full border border-navy/10 bg-white px-5 py-1.5 text-xs font-medium text-navy/70">
                    Appointment
                </span>

                <h1 className="text-3xl font-semibold text-navy">
                    {appointment.user?.name}
                </h1>

                <p className="text-sm text-navy/70">
                    Current Time
                </p>

                <p className="text-lg font-medium text-navy">
                    {appointment.date} • {appointment.startTime} – {appointment.endTime}
                </p>

            </div>

        </section>
    );
}