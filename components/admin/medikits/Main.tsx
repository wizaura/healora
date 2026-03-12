"use client"

import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"

export default function MedikitsPage() {

    const { data = [] } = useQuery({
        queryKey: ["medikits"],
        queryFn: () => api.get("/medikits").then(res => res.data)
    })

    return (

        <div className="max-w-6xl mx-auto py-20 px-6">

            <div className="flex justify-between mb-10">

                <h1 className="text-2xl font-semibold">
                    Medikits
                </h1>

                <button className="bg-navy text-white px-4 py-2 rounded-lg">
                    Add Medikit
                </button>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

                {data.map((kit: any) => (
                    <div
                        key={kit.id}
                        className="border rounded-xl overflow-hidden bg-white"
                    >

                        {kit.imageUrl && (
                            <img
                                src={kit.imageUrl}
                                className="w-full h-40 object-cover"
                            />
                        )}

                        <div className="p-4 space-y-2">

                            <h3 className="font-semibold">
                                {kit.title}
                            </h3>

                            <p className="text-sm text-slate-500 line-clamp-2">
                                {kit.description}
                            </p>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}