"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  Users,
  Stethoscope,
  Calendar,
  CreditCard,
  IndianRupee,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const [range, setRange] = useState("7d");

  const { data: summary } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/summary");
      return res.data;
    },
  });

  const { data: revenueChart } = useQuery({
    queryKey: ["revenue-chart", range],
    queryFn: async () => {
      const res = await api.get(
        `/admin/dashboard/revenue-chart?range=${range}`
      );
      return res.data;
    },
  });

  console.log(revenueChart,'revCh')

  const { data: payments } = useQuery({
    queryKey: ["recent-payments"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/payments");
      return res.data;
    },
  });

  const { data: topDoctors } = useQuery({
    queryKey: ["top-doctors"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/top-doctors");
      return res.data;
    },
  });

  const cards = [
    {
      title: "Total Doctors",
      value: summary?.totalDoctors || 0,
      icon: Stethoscope,
    },
    {
      title: "Total Patients",
      value: summary?.totalPatients || 0,
      icon: Users,
    },
    {
      title: "Appointments",
      value: summary?.totalAppointments || 0,
      icon: Calendar,
    },
    {
      title: "Payments",
      value: summary?.totalPayments || 0,
      icon: CreditCard,
    },
    {
      title: "Revenue",
      value: `₹${summary?.totalRevenue || 0}`,
      icon: IndianRupee,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-slate-900">
        Admin Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {card.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <Icon size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {["7d", "30d", "12m"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-1 rounded-lg border border-gray-200 ${
              range === r ? "bg-teal-600 text-white" : "bg-white"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* REVENUE */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h2 className="mb-4 font-semibold">Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChart || []}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* APPOINTMENTS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h2 className="mb-4 font-semibold">Appointments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueChart || []}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appointments" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOP DOCTORS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="mb-4 font-semibold">Top Doctors</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b border-gray-300">
            <tr>
              <th className="py-2">Doctor</th>
              <th>Appointments</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topDoctors?.map((d: any) => (
              <tr key={d.doctorId} className="border-b border-gray-200">
                <td className="py-3">{d.name}</td>
                <td>{d.appointments}</td>
                <td>₹{d.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECENT PAYMENTS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="mb-4 font-semibold">Recent Payments</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b border-gray-300">
              <tr>
                <th className="py-2">Invoice</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {payments?.map((p: any) => (
                <tr key={p.id} className="border-b border-gray-200">
                  <td className="py-3">
                    {p.prescription?.invoiceNumber || "-"}
                  </td>
                  <td>{p.user?.name}</td>
                  <td>
                    {p.appointment?.doctor?.user?.name ||
                      p.prescription?.appointment?.doctor?.user?.name}
                  </td>
                  <td>{p.type}</td>
                  <td>₹{p.amount}</td>
                  <td>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}