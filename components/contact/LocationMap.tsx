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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.7973335061647!2d75.92459107775144!3d11.349508660051209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba643c58d77852f%3A0x354a79fa7f74ce52!2sHealora%20Wellness%20Centre!5e0!3m2!1sen!2sin!4v1776966579896!5m2!1sen!2sin"
                        className="w-full h-[400px] border-0"
                        loading="lazy"
                    />

                </div>
            </div>

        </section>

    );

}