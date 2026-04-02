"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const { data = [], isLoading } = useQuery({
    queryKey: ["doctor-patients"],
    queryFn: async () => {
      const res = await api.get("/consultations/patients");
      return res.data;
    },
  });

  /* ---------------- FILTER ---------------- */

  const filteredPatients = useMemo(() => {
    let filtered = data;

    if (search) {
      filtered = filtered.filter((p: any) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "RECENT") {
      filtered = filtered.slice(0, 5);
    }

    if (filter === "COMPLETED") {
      filtered = filtered.filter((p: any) => p.completedAppointments > 0);
    }

    if (filter === "UNPAID") {
      filtered = filtered.filter((p: any) => p.pendingPayments > 0);
    }

    return filtered;
  }, [data, search, filter]);

  return (
    <div className="bg-white max-w-7xl mx-auto px-6 py-20 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            My Patients
          </h1>
          <p className="text-sm text-slate-500">
            Manage and view your patient records
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 focus:border-[#1F2147] focus:ring-2 focus:ring-[#1F2147]/10 rounded-xl pl-9 pr-4 py-2 text-sm outline-none transition w-64"
          />
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 flex-wrap">
        {["ALL", "RECENT", "COMPLETED", "UNPAID"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm rounded-lg border transition
              ${
                filter === f
                  ? "bg-[#1F2147] text-white border-[#1F2147]"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-14 bg-slate-100 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          No patients found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs uppercase tracking-wider border-b">
                <th className="py-3 text-left">Patient</th>
                <th className="py-3 text-left">Email</th>
                <th className="py-3 text-left">Appointments</th>
                <th className="py-3 text-left">Last Visit</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient: any) => (
                <tr
                  key={patient.id}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold">
                        {patient.name?.charAt(0)}
                      </div>
                      <div className="font-medium text-slate-800">
                        {patient.name}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-slate-600">
                    {patient.email}
                  </td>

                  <td className="py-4 text-slate-600">
                    {patient.totalAppointments || 0}
                  </td>

                  <td className="py-4 text-slate-600">
                    {patient.lastVisit
                      ? new Date(patient.lastVisit).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="py-4 text-right">
                    <Link
                      href={`/doctor/patients/${patient.id}`}
                      className="px-4 py-1.5 text-sm font-medium rounded-lg bg-[#1F2147] text-white hover:bg-[#141633] transition"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}