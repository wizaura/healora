"use client";

export default function ContactFormSection() {

    return (

        <section className="m-4 rounded-2xl">
            <div className="max-w-4xl mx-auto px-6 pb-16">

                <div className="text-center mb-14">

                    <h2 className="text-2xl md:text-4xl font-semibold text-slate-900">
                        Send Us a Message
                    </h2>

                    <p className="text-slate-600 mt-4 max-w-xl mx-auto">
                        Have a question about our services or consultations?
                        Fill out the form below and our team will get back
                        to you as soon as possible.
                    </p>

                </div>


                <form className="space-y-6">

                    <div className="grid md:grid-cols-2 gap-6">

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                    </div>

                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <button
                        type="submit"
                        className="
                    bg-teal-600
                    text-white
                    px-6 py-3
                    rounded-lg
                    font-medium
                    hover:bg-teal-700
                    transition
                    "
                    >
                        Send Message
                    </button>

                </form>
            </div>

        </section>

    );

}