"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

type User = {
    sub: string;
    role: "PATIENT" | "DOCTOR" | "ADMIN";
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<User | null>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUser: async () => null,
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchMe = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data);
            return res.data;
        } catch {
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        return fetchMe();
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, loading, refreshUser, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
