"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function AppointmentsCalendar({
    appointments,
    onSelect,
}: any) {
    const [view, setView] = useState("timeGridWeek");

    const events = appointments.map((appt: any) => ({
        id: appt.id,
        title: appt.user?.name,
        start: appt.slot.startTimeUTC,
        end: appt.slot.endTimeUTC,
        extendedProps: appt,
        backgroundColor: getStatusColor(appt.status),
        borderColor: "transparent",
    }));

    return (
        <div className="bg-gradient-to-br from-[#F4FBF9] to-white rounded-3xl border border-[#E2F0ED] p-8 shadow-sm">

            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                initialView={view}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "timeGridDay,timeGridWeek",
                }}
                buttonText={{
                    today: "Today",
                    week: "Week",
                    day: "Day",
                }}
                events={events}
                height="650px"
                slotMinTime="06:00:00"
                slotMaxTime="22:00:00"
                eventClick={(info) =>
                    onSelect(info.event.extendedProps)
                }
                eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }}
            />
        </div>
    );
}

/* ================= STATUS COLORS ================= */

function getStatusColor(status: string) {
    switch (status) {
        case "CONFIRMED":
            return "#1F9E8E";
        case "PENDING":
            return "#C98B00";
        case "CANCELLED":
            return "#E5484D";
        case "COMPLETED":
            return "#2D7FF9";
        default:
            return "#E6F7F4";
    }
}
