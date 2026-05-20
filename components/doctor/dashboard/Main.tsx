"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Activity,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

import Loader from "@/components/common/Loader";
import TodayPanel from "../appointments/TodayPanel";

export default function DoctorDashboard() {

  /* =====================================================
     QUERIES
  ===================================================== */

  const {
    data: summary,
    isLoading,
  } = useQuery({

    queryKey: [
      "doctor-summary",
    ],

    queryFn: async () => {

      const res =
        await api.get(
          "/doctor/dashboard/summary"
        );

      return res.data;
    },
  });

  const {
    data: appointments,
  } = useQuery({

    queryKey: [
      "doctor-appointments-chart",
    ],

    queryFn: async () => {

      const res =
        await api.get(
          "/doctor/dashboard/appointments-chart?range=7d"
        );

      return res.data;
    },
  });

  const {
    data: categoryChart,
  } = useQuery({

    queryKey: [
      "doctor-category-chart",
    ],

    queryFn: async () => {

      const res =
        await api.get(
          "/doctor/dashboard/category-chart"
        );

      return res.data;
    },
  });

  const {
    data: statusChart,
  } = useQuery({

    queryKey: [
      "doctor-status-chart",
    ],

    queryFn: async () => {

      const res =
        await api.get(
          "/doctor/dashboard/status-chart"
        );

      return res.data;
    },
  });

  const {
    data: patients,
  } = useQuery({

    queryKey: [
      "doctor-recent-patients",
    ],

    queryFn: async () => {

      const res =
        await api.get(
          "/doctor/dashboard/recent-patients"
        );

      return res.data;
    },
  });

  const {
    data: activity,
  } = useQuery({

    queryKey: [
      "doctor-recent-activity",
    ],

    queryFn: async () => {

      const res =
        await api.get(
          "/doctor/dashboard/recent-activity"
        );

      return res.data;
    },
  });

  const {
    data: todayAppointments,
  } = useQuery({

    queryKey: [
      "doctor-today-appointments",
    ],

    queryFn: async () => {

      const res =
        await api.get(
          "/doctor/dashboard/today-appointments"
        );

      return res.data;
    },
  });

  if (isLoading || !summary) {
    return <Loader fullScreen />;
  }

  const pieColors = [
    "#14B8A6",
    "#06B6D4",
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
  ];

  return (

    <div className="space-y-8 max-w-7xl mx-auto">

      {/* =====================================================
               HERO
            ===================================================== */}

      <div
        className="
                    overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-gradient-to-br
                    from-teal-50
                    via-white
                    to-cyan-50

                    p-8

                    shadow-sm
                "
      >

        <div
          className="
                        flex flex-col gap-6

                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
        >

          <div>

            <div
              className="
                                inline-flex items-center gap-2

                                rounded-full

                                border border-teal-100

                                bg-white

                                px-4 py-2

                                text-xs font-semibold

                                uppercase tracking-wide

                                text-teal-700
                            "
            >

              <Activity size={14} />

              Doctor Analytics

            </div>

            <h1
              className="
                                mt-5

                                text-4xl font-semibold

                                tracking-[-0.03em]

                                text-slate-900
                            "
            >

              Dashboard Overview

            </h1>

            <p
              className="
                                mt-3

                                max-w-2xl

                                text-sm leading-7

                                text-slate-600
                            "
            >

              Monitor appointments,
              patient activity,
              consultation trends,
              and booking analytics
              from your dashboard.

            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
               STATS
            ===================================================== */}

      <div
        className="
                    grid gap-5

                    sm:grid-cols-2
                    xl:grid-cols-4
                "
      >

        <StatCard
          title="Today"
          value={summary.todayAppointments}
          icon={<Calendar size={18} />}
        />

        <StatCard
          title="Upcoming"
          value={summary.upcomingAppointments}
          icon={<Clock size={18} />}
        />

        <StatCard
          title="Patients"
          value={summary.totalPatients}
          icon={<Users size={18} />}
        />

        <StatCard
          title="Completed"
          value={summary.completedAppointments}
          icon={<CheckCircle2 size={18} />}
        />

        {/* <StatCard
          title="Cancelled"
          value={summary.cancelledAppointments}
          icon={<XCircle size={18} />}
        /> */}

      </div>

      {/* =====================================================
               MAIN CHARTS
            ===================================================== */}

      <div
        className="
                    grid gap-6

                    md:grid-cols-2
                "
      >

        <TodayPanel
          appointments={
            todayAppointments || []
          }

          isViewButton={false}
        />

        {/* APPOINTMENTS TREND */}

        <div
          className="
                        rounded-2xl

                        border border-slate-200

                        bg-white

                        p-6

                        shadow-sm
                    "
        >

          <div
            className="
                            mb-6

                            flex items-center justify-between
                        "
          >

            <div>

              <h3
                className="
                                    text-lg font-semibold

                                    text-slate-900
                                "
              >

                Appointment Trend

              </h3>

              <p
                className="
                                    mt-1

                                    text-sm

                                    text-slate-500
                                "
              >

                Last 7 days activity

              </p>

            </div>

          </div>

          <div className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={appointments || []}
              >

                <defs>

                  <linearGradient
                    id="colorAppointments"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#14B8A6"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="95%"
                      stopColor="#14B8A6"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#14B8A6"
                  fillOpacity={1}
                  fill="url(#colorAppointments)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* =====================================================
               SECOND ROW
            ===================================================== */}

      <div
        className="
                    grid gap-6

                    md:grid-cols-3
                "
      >

        {/* CATEGORY PIE */}

        <div
          className="
                        rounded-2xl

                        border border-slate-200

                        bg-white

                        p-6

                        shadow-sm
                    "
        >

          <div className="mb-6">

            <h3
              className="
                                text-lg font-semibold

                                text-slate-900
                            "
            >

              Consultation Categories

            </h3>

            <p
              className="
                                mt-1

                                text-sm

                                text-slate-500
                            "
            >

              Appointment distribution
              by slot category

            </p>

          </div>

          <div className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={
                    categoryChart || []
                  }

                  dataKey="value"

                  nameKey="name"

                  outerRadius={110}

                  innerRadius={60}
                >

                  {(categoryChart || []).map(
                    (_: any, index: number) => (

                      <Cell
                        key={index}
                        fill={
                          pieColors[
                          index %
                          pieColors.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* STATUS */}

        <div
          className="
                        rounded-2xl

                        border border-slate-200

                        bg-white

                        p-6

                        shadow-sm
                    "
        >

          <div className="mb-6">

            <h3
              className="
                                text-lg font-semibold

                                text-slate-900
                            "
            >

              Appointment Status

            </h3>

            <p
              className="
                                mt-1

                                text-sm

                                text-slate-500
                            "
            >

              Status distribution

            </p>

          </div>

          <div className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={
                  statusChart || []
                }
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#14B8A6"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* RECENT PATIENTS */}

        <div
          className="
                        rounded-2xl

                        border border-slate-200

                        bg-white

                        p-6

                        shadow-sm
                    "
        >

          <div className="mb-6">

            <h3
              className="
                                text-lg font-semibold

                                text-slate-900
                            "
            >

              Recent Patients

            </h3>

            <p
              className="
                                mt-1

                                text-sm

                                text-slate-500
                            "
            >

              Recently consulted patients

            </p>

          </div>

          <div className="space-y-4">

            {(patients || []).map(
              (p: any) => (

                <div
                  key={p.id}

                  className="
                                        flex items-center justify-between

                                        rounded-2xl

                                        border border-slate-200

                                        bg-slate-50/60

                                        p-4
                                    "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                                                flex h-12 w-12
                                                items-center justify-center

                                                rounded-2xl

                                                bg-gradient-to-br
                                                from-teal-500
                                                to-cyan-500

                                                text-sm font-semibold
                                                text-white
                                            "
                    >

                      {p.user.name?.charAt(0)}

                    </div>

                    <div>

                      <p
                        className="
                                                    font-medium

                                                    text-slate-900
                                                "
                      >

                        {p.user.name}

                      </p>

                      <p
                        className="
                                                    text-sm

                                                    text-slate-500
                                                "
                      >

                        {p.user.email}

                      </p>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
               RECENT ACTIVITY
            ===================================================== */}

      <div
        className="
                    rounded-2xl

                    border border-slate-200

                    bg-white

                    p-6

                    shadow-sm
                "
      >

        <div className="mb-6">

          <h3
            className="
                            text-lg font-semibold

                            text-slate-900
                        "
          >

            Recent Activity

          </h3>

          <p
            className="
                            mt-1

                            text-sm

                            text-slate-500
                        "
          >

            Latest appointments and consultations

          </p>

        </div>

        <div className="space-y-4">

          {(activity || []).map(
            (a: any) => (

              <div
                key={a.id}

                className="
                                    flex flex-col gap-4

                                    rounded-2xl

                                    border border-slate-200

                                    bg-slate-50/60

                                    p-5

                                    lg:flex-row
                                    lg:items-center
                                    lg:justify-between
                                "
              >

                <div>

                  <h4
                    className="
                                            font-semibold

                                            text-slate-900
                                        "
                  >

                    {a.user?.name}

                  </h4>

                  <p
                    className="
                                            mt-1

                                            text-sm

                                            text-slate-500
                                        "
                  >

                    {new Date(
                      a.createdAt
                    ).toLocaleString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",

                        hour: "numeric",
                        minute: "2-digit",

                        hour12: true,
                      }
                    )}

                  </p>

                </div>

                <div className="flex gap-2">

                  <span
                    className="
                                            rounded-full

                                            bg-teal-100

                                            px-3 py-1

                                            text-xs font-medium

                                            text-teal-700
                                        "
                  >

                    {a.status}

                  </span>

                  {a.prescription && (

                    <span
                      className="
                                                rounded-full

                                                bg-cyan-100

                                                px-3 py-1

                                                text-xs font-medium

                                                text-cyan-700
                                            "
                    >

                      Prescription

                    </span>

                  )}

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  title,
  value,
  icon,
}: any) {

  return (

    <div
      className="
                overflow-hidden

                rounded-2xl

                border border-slate-200

                bg-white

                p-6

                shadow-sm
            "
    >

      <div className="flex items-start justify-between">

        <div>

          <p
            className="
                            text-sm

                            text-slate-500
                        "
          >

            {title}

          </p>

          <h3
            className="
                            mt-3

                            text-4xl font-semibold

                            tracking-[-0.03em]

                            text-slate-900
                        "
          >

            {value}

          </h3>

        </div>

        <div
          className="
                        flex h-12 w-12
                        items-center justify-center

                        rounded-2xl

                        bg-teal-50

                        text-teal-600
                    "
        >

          {icon}

        </div>

      </div>

    </div>
  );
}