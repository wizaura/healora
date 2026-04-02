"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ProfileHeader from "@/components/profile/ProfileHeader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  /* Loading state */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1F2147] border-t-transparent"></div>
      </div>
    );
  }

  /* Not logged in → render nothing while redirecting */
  if (!user) {
    return null;
  }

  /* Logged in → render layout */
  return (
    <div className="pt-24 pb-12 bg-slate-50 min-h-screen">
      <ProfileHeader />
      <div className="mx-auto max-w-5xl px-6">
        {children}
      </div>
    </div>
  );
}