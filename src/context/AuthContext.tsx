"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

interface UserProfile {
    id: string;
    email: string;
    name: string;
    phone: string;
    college: string;
    department: string;
    rulesAccepted: boolean;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    loading: boolean;
    signUp: (email: string, password: string, metadata: Omit<UserProfile, "id" | "email" | "rulesAccepted" | "createdAt">) => Promise<{ error: Error | null }>;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signInWithGoogle: () => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    acceptRules: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    async function fetchProfile(userId: string) {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (!error && data) {
            setProfile(data as UserProfile);
        }
    }

    async function signUp(
        email: string,
        password: string,
        metadata: Omit<UserProfile, "id" | "email" | "rulesAccepted" | "createdAt">
    ) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
            },
        });

        if (!error && data.user) {
            // Create user profile in database
            await supabase.from("users").insert({
                id: data.user.id,
                email,
                name: metadata.name,
                phone: metadata.phone,
                college: metadata.college,
                department: metadata.department,
                rulesAccepted: false,
                createdAt: new Date().toISOString(),
            });
        }

        return { error: error as Error | null };
    }

    async function signIn(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error: error as Error | null };
    }

    async function signInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        return { error: error as Error | null };
    }

    async function signOut() {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setProfile(null);
    }

    async function acceptRules() {
        if (!user) return;

        await supabase
            .from("users")
            .update({ rulesAccepted: true })
            .eq("id", user.id);

        setProfile(prev => prev ? { ...prev, rulesAccepted: true } : null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            session,
            profile,
            loading,
            signUp,
            signIn,
            signInWithGoogle,
            signOut,
            acceptRules,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
