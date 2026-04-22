"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  Calendar,
  Clock,
  IndianRupee,
  Users,
} from "lucide-react";

export default function DoctorDashboard() {
  const { data: summary } = useQuery({
    queryKey: ["doctor-summary"],
    queryFn: async () => {
      const res = await api.get("/doctor/dashboard/summary");
      return res.data;
    },
  });

  const { data: appointments } = useQuery({
    queryKey: ["doctor-appointments-chart"],
    queryFn: async () => {
      const res = await api.get("/doctor/dashboard/appointments-chart?range=7d");
      return res.data;
    },
  });

  const { data: patients } = useQuery({
    queryKey: ["doctor-recent-patients"],
    queryFn: async () => {
      const res = await api.get("/doctor/dashboard/recent-patients");
      return res.data;
    },
  });

  if (!summary) return <div className="p-8 pt-24">Loading...</div>;

  return (
    <div className="p-8 pt-24 mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Doctor Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Overview of your consultations and earnings
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Today Appointments"
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
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Appointments (7 days)" data={appointments} dataKey="appointments" />
        <RecentPatients patients={patients} />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-slate-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, data, dataKey }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold mb-4">{title}</h3>

      {!data ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : (
        <div className="space-y-2">
          {data.map((d: any) => (
            <div key={d.date} className="flex justify-between text-sm">
              <span>{d.date}</span>
              <span className="font-medium">{d[dataKey]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecentPatients({ patients }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Recent Patients</h3>

      {!patients ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : (
        <div className="space-y-3">
          {patients.map((p: any) => (
            <div key={p.id} className="border border-gray-200 rounded-lg p-3">
              <p className="font-medium text-sm">{p.user.name}</p>
              <p className="text-xs text-slate-500">{p.user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecentPayments({ payments }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Recent Payments</h3>

      {!payments ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : (
        <div className="space-y-3">
          {payments.map((p: any) => (
            <div key={p.id} className="border rounded-lg p-3 flex justify-between">
              <div>
                <p className="font-medium text-sm">
                  {p.appointment.user.name}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="font-semibold">₹{p.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}