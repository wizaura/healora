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

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB");
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

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

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("subject", form.subject);
            formData.append("message", form.message);

            if (image) {
                formData.append("image", image);
            }

            await api.post("/consultations/contact", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Message sent successfully!");

            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

            setImage(null);
            setPreview(null);

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

                    <div className="space-y-3">

                        {/* LABEL */}
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Attach Image (optional)
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">
                                Max 5MB
                            </span>
                        </label>

                        {/* INPUT */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="
            w-full text-sm
            border border-slate-200 rounded-lg
            px-3 py-2
            file:mr-3 file:px-3 file:py-1.5
            file:border-0 file:bg-teal-50
            file:text-teal-700 file:rounded-md
            hover:file:bg-teal-100
        "
                        />

                        {/* PREVIEW */}
                        {preview && (
                            <div className="relative w-32 h-32 mt-2">
                                <img
                                    src={preview}
                                    className="w-full h-full object-cover rounded-lg border"
                                />

                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage(null);
                                        setPreview(null);
                                    }}
                                    className="
                    absolute -top-2 -right-2
                    bg-black text-white text-xs
                    rounded-full w-6 h-6 flex items-center justify-center
                    hover:bg-red-500
                "
                                >
                                    ×
                                </button>
                            </div>
                        )}

                    </div>

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