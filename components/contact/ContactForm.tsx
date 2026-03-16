"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/util";

export default function ContactFormSection() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {

        if (!form.name.trim()) {
            toast.error("Name is required");
            return false;
        }

        if (!form.email.trim()) {
            toast.error("Email is required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email)) {
            toast.error("Please enter a valid email");
            return false;
        }

        if (!form.message.trim()) {
            toast.error("Message cannot be empty");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {

            await api.post("/consultations/contact", {
                name: form.name,
                email: form.email,
                subject: form.subject,
                message: form.message,
            });

            toast.success("Message sent successfully!");

            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

        } catch (err: any) {

            toast.error(getApiError(err));

        } finally {

            setLoading(false);

        }

    };

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

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid md:grid-cols-2 gap-6">

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                    </div>

                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <textarea
                        rows={5}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        bg-teal-600
                        text-white
                        px-6 py-3
                        rounded-lg
                        font-medium
                        hover:bg-teal-700
                        transition
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                        "
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                </form>

            </div>

        </section>

    );
}