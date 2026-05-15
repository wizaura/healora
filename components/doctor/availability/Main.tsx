"use client";

import { useState } from "react";

import AvailabilityForm from "./AvailabilityForm";
import ExistingAvailability from "./ExistingAvailability";
import GoogleCalenderSetup from "./GoogleCalenderSetup";
import ZoomSetup from "./ZoomSetup";

export default function DoctorAvailability() {

    const [refreshKey,
        setRefreshKey] =
        useState(0);

    const triggerRefresh =
        () => {

            setRefreshKey(
                (prev) => prev + 1
            );
        };

    return (

        <div
            className="
                mx-auto

                max-w-7xl

                space-y-6

                p-3 pt-12

                md:p-8
            "
        >

            <div
                className="
                    mx-auto

                    flex flex-col gap-6

                    md:flex-row
                    md:justify-center
                "
            >

                <GoogleCalenderSetup />

                <ZoomSetup />

            </div>

            {/* =====================================
               FORM
               ===================================== */}

            <AvailabilityForm
                onSuccess={triggerRefresh}
            />

            {/* =====================================
               EXISTING
               ===================================== */}

            <ExistingAvailability
                refreshKey={refreshKey}
            />

        </div>
    );
}