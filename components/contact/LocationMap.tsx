"use client";

export default function ContactMapSection() {

    return (

        <section className="m-4 rounded-2xl px-6 py-16 bg-gradient-to-b from-wellness-bg via-white to-wellness-bg">

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">

                    <h2 className="text-2xl md:text-4xl font-semibold text-slate-900">
                        Visit Our Clinic
                    </h2>

                    <p className="text-slate-600 mt-4 max-w-xl mx-auto">
                        Healora Wellness Centre welcomes you for in-person
                        consultations during clinic hours.
                    </p>

                </div>


                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">

                    <iframe
                        src="https://maps.google.com/maps?q=Kozhikode&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-[400px] border-0"
                        loading="lazy"
                    />

                </div>
            </div>

        </section>

    );

}