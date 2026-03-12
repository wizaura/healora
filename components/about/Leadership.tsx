import Image from "next/image";

const leaders = [
    {
        name: "Dr Reenidge Emmanuel",
        role: "Co-Founder & Director",
        image: "/leaders/reenidge.jpg",
        description:
            "Dr. Reenidge Emmanuel is a highly accomplished homeopathic physician and mental-health practitioner with over nine years of clinical experience. He integrates medical science with psychological insight to foster holistic well-being.",
    },
    {
        name: "Dr Dilraj M",
        role: "Co-Founder & Director",
        image: "/doc_1.png",
        description:
            "Dr Dilraj M is a passionate homeopathic practitioner with over 8 years of clinical expertise. He co-founded Healora to bridge the gap between quality care and global accessibility.",
    },
    {
        name: "Dr Anu A A",
        role: "Co-Founder & Director",
        image: "/leaders/anu.jpg",
        description:
            "Dr. Anu A. A. is a distinguished homeopathic physician and holistic health practitioner with over 8 years of experience, combining clinical expertise with nutrition and lifestyle medicine.",
    },
    {
        name: "Dr Bittumol Benny",
        role: "Co-Founder & Director",
        image: "/leaders/bittumol.jpg",
        description:
            "Dr. Bittumol Benny is a homeopathic physician with expertise in public health and preventive wellness, focusing on root-cause healing and personalized patient care.",
    },
];

export default function LeadershipSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">

            {/* HEADER */}

            <div className="text-center max-w-3xl mx-auto space-y-4">

                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
                    Leadership
                </h2>

                <p className="text-slate-600">
                    Healora Wellness Centre is guided by a team of dedicated
                    healthcare professionals who share a vision of accessible,
                    compassionate, and integrated wellness.
                </p>

            </div>


            {/* LEADERS GRID */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {leaders.map((leader, index) => (
                    <div
                        key={index}
                        className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
                    >

                        {/* IMAGE */}

                        <div className="relative h-84 w-full overflow-hidden">

                            <Image
                                src={leader.image}
                                alt={leader.name}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                            />

                        </div>


                        {/* CONTENT */}

                        <div className="p-6 space-y-3 text-center">

                            <h3 className="font-semibold text-slate-900">
                                {leader.name}
                            </h3>

                            <p className="text-sm text-teal-600 font-medium">
                                {leader.role}
                            </p>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                {leader.description}
                            </p>

                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}