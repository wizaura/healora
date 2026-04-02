"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/profile.api";
import Link from "next/link";
import {
  User,
  LogOut,
  Calendar,
  Settings,
  CreditCard,
  Mail,
  Phone,
  Cake,
  VenusAndMars,
} from "lucide-react";

export default function Profile() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.sub],
    queryFn: () => getProfile(user!.sub),
    enabled: !!user?.sub,
  });

  if (loading || profileLoading) return null;

  if (!user) {
    router.replace("/login");
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-6 space-y-8">

        {/* PROFILE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-700 overflow-hidden text-xl font-semibold">
              {profile?.image ? (
                <img src={profile.image} className="h-full w-full object-cover" />
              ) : (
                <User size={28} />
              )}
            </div>

            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                {profile?.name || "User"}
              </h1>
              <p className="text-sm text-slate-500">{profile?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
        
        {/* STATISTICS */}
        <div className="grid gap-6 md:grid-cols-3">
          <DashboardCard
            title="Upcoming Appointments"
            value="2"
            description="You have 2 upcoming visits."
          />
          <DashboardCard
            title="Past Visits"
            value="8"
            description="Completed consultations."
          />
          <DashboardCard
            title="Saved Doctors"
            value="3"
            description="Doctors you follow."
          />
        </div>

        {/* PERSONAL INFO CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InfoItem icon={<User size={16} />} label="Full Name" value={profile?.name} />
            <InfoItem icon={<Mail size={16} />} label="Email" value={profile?.email} />
            <InfoItem icon={<Phone size={16} />} label="Phone" value={profile?.phone || "—"} />
            <InfoItem icon={<Cake size={16} />} label="Age" value={profile?.age || "—"} />
            <InfoItem icon={<VenusAndMars size={16} />} label="Gender" value={profile?.gender || "—"} />

          </div>
        </div>


      </div>
    </div>
  );
}

/* NAV ITEM */
function NavItem({ href, icon, label }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
    >
      {icon}
      {label}
    </Link>
  );
}

/* INFO ITEM */
function InfoItem({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
      <div className="text-slate-500">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}

/* DASHBOARD CARD */
function DashboardCard({ title, value, description }: any) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}