"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
    Stethoscope,
    FileText,
    Truck,
    CreditCard,
    User,
    Info,
    ChevronDown,
    Search
} from "lucide-react";
import PageHeader from "../common/PageHeader";

const ICON_MAP: any = {
    stethoscope: Stethoscope,
    fileText: FileText,
    truck: Truck,
    creditCard: CreditCard,
    user: User,
    info: Info,
};

export default function FAQPage() {

    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [openIndex, setOpenIndex] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const [catRes, faqRes] = await Promise.all([
                    api.get("/faq-categories/public"),
                    api.get("/faqs/public"),
                ]);

                const categoriesData = catRes.data;
                const faqData = faqRes.data;

                setCategories(categoriesData.filter((c: any) => c.isActive));
                setFaqs(faqData.filter((f: any) => f.isActive));

            } catch (err) {
                console.error("Failed to load FAQs", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const visibleGroups = categories
        .map((cat) => ({
            category: cat.name,
            icon: ICON_MAP[cat.icon] || Info,
            items: faqs.filter(
                (f) =>
                    f.categoryId === cat.id &&
                    (f.question.toLowerCase().includes(search.toLowerCase()) ||
                        f.answer.toLowerCase().includes(search.toLowerCase()))
            ),
        }))
        .filter(
            (g) =>
                (activeCategory === "All" || g.category === activeCategory) &&
                g.items.length > 0
        );

    return (
        <section className="m-4 rounded-2xl px-6 py-12 bg-gradient-to-b from-white via-white to-wellness-bg">

            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <PageHeader
                    title="Frequently Asked Questions"
                    subtitle="Find answers to common questions about consultations, prescriptions, delivery, and payments at Healora."
                />

                {/* SEARCH */}
                <div className="mb-10 relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3"
                    />
                </div>

                {/* CATEGORY FILTER */}
                <div className="flex flex-wrap gap-3 mb-12">
                    <button
                        onClick={() => setActiveCategory("All")}
                        className={`px-4 py-2 rounded-full border ${activeCategory === "All"
                                ? "bg-navy text-white"
                                : "border-gray-300"
                            }`}
                    >
                        All
                    </button>

                    {categories.map((cat) => {
                        const Icon = ICON_MAP[cat.icon] || Info;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${activeCategory === cat.name
                                        ? "bg-navy text-white"
                                        : "border-gray-300"
                                    }`}
                            >
                                <Icon size={16} />
                                {cat.name}
                            </button>
                        );
                    })}
                </div>

                {/* FAQ LIST */}
                {loading && (
                    <p className="text-center text-gray-400">Loading FAQs...</p>
                )}

                {!loading && visibleGroups.length === 0 && (
                    <p className="text-center text-gray-400">
                        No FAQs found.
                    </p>
                )}

                <div className="space-y-10">
                    {visibleGroups.map((group, i) => {
                        const Icon = group.icon;

                        return (
                            <div key={i}>
                                <div className="flex items-center gap-3 mb-4">
                                    <Icon className="text-navy" />
                                    <h2 className="text-2xl font-semibold text-slate-900">
                                        {group.category}
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    {group.items.map((faq: any) => (
                                        <div
                                            key={faq.id}
                                            className="border border-gray-200 rounded-xl bg-white"
                                        >
                                            <button
                                                onClick={() =>
                                                    setOpenIndex(
                                                        openIndex === faq.id ? null : faq.id
                                                    )
                                                }
                                                className="w-full flex justify-between items-center px-5 py-4 text-left"
                                            >
                                                <span className="font-medium">
                                                    {faq.question}
                                                </span>

                                                <ChevronDown
                                                    className={`transition ${openIndex === faq.id ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            {openIndex === faq.id && (
                                                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}