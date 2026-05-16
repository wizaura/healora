"use client"

import CareerFormSection from "./CareerForm";
import CareerHeader from "./CareerHeader";

export default function Career() {
    return (
        <div className="bg-white min-h-screen antialiased">
            <CareerHeader />
            <CareerFormSection />
        </div>
    );
}