export default function AppointmentSummary({
    appointment,
}: any) {

    const doctor =
        appointment?.doctor;

    return (

        <section
            className="
                relative

                overflow-hidden

                rounded-lg

                border border-slate-200

                bg-gradient-to-br
                from-white
                to-slate-50

                shadow-sm
            "
        >

            {/* BG */}
            <div
                className="
                    absolute top-0 right-0

                    h-40 w-40

                    rounded-full

                    bg-teal-100/40

                    blur-3xl
                "
            />

            <div
                className="
                    relative

                    flex flex-col lg:flex-row
                    lg:items-center
                    lg:justify-between

                    gap-6

                    px-6 py-6
                "
            >

                {/* LEFT */}
                <div className="flex items-center gap-5">

                    {/* IMAGE */}
                    <div
                        className="
                            relative

                            h-24 w-24

                            overflow-hidden

                            rounded-lg

                            border border-slate-200

                            bg-slate-100

                            shrink-0
                        "
                    >

                        {appointment?.imageUrl ? (

                            <img
                                src={appointment?.imageUrl}

                                alt={
                                    appointment.doctorName
                                }

                                className="
                                    h-full w-full

                                    object-cover
                                "
                            />

                        ) : (

                            <div
                                className="
                                    flex h-full w-full
                                    items-center justify-center

                                    text-2xl font-semibold
                                    text-slate-500
                                "
                            >

                                {appointment?.doctorName?.charAt(0)}

                            </div>

                        )}

                    </div>

                    {/* INFO */}
                    <div className="space-y-3">

                        <div>

                            <span
                                className="
                                    inline-flex items-center

                                    rounded-full

                                    border border-teal-200

                                    bg-teal-50

                                    px-3 py-1

                                    text-xs font-medium
                                    text-teal-700
                                "
                            >
                                Current Appointment
                            </span>

                        </div>

                        <div>

                            <h1 className="text-2xl font-semibold text-slate-900">
                                {appointment.doctorName}
                            </h1>

                            {doctor?.specialities?.[0]
                                ?.speciality?.name && (

                                    <p className="mt-1 text-sm text-slate-500">

                                        {
                                            doctor.specialities[0]
                                                .speciality.name
                                        }

                                    </p>

                                )}

                        </div>

                        <div className="flex flex-wrap gap-2">

                            <div
                                className="
                                    rounded-lg

                                    border border-slate-200

                                    bg-white

                                    px-3 py-2

                                    text-sm text-slate-700
                                "
                            >

                                {appointment.date}

                            </div>

                            <div
                                className="
                                    rounded-lg

                                    border border-slate-200

                                    bg-white

                                    px-3 py-2

                                    text-sm text-slate-700
                                "
                            >

                                {appointment.startTime}
                                {" - "}
                                {appointment.endTime}

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}
                <div
                    className="
                        rounded-lg

                        border border-slate-200

                        bg-white/80

                        px-5 py-4

                        min-w-[220px]
                    "
                >

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Current Status
                    </p>

                    <div className="mt-2 flex items-center gap-2">

                        <div
                            className="
                                h-2.5 w-2.5

                                rounded-full

                                bg-emerald-500
                            "
                        />

                        <p className="text-sm font-medium text-slate-800">
                            {
                                appointment.status
                            }
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}