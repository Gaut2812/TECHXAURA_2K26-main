"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const { user, profile, signOut, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-cyan-500 border-t-purple-500 rounded-full"
                />
            </div>
        );
    }

    if (!user) return null;

    async function handleSignOut() {
        await signOut();
        router.push("/");
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                        TECHXAURA
                    </h1>
                    <Button
                        onClick={handleSignOut}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                    >
                        Sign Out
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-white mb-6">Welcome to Your Dashboard</h2>

                    {/* User Profile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
                            <div className="space-y-2">
                                <p className="text-white/80">
                                    <span className="font-semibold text-white">Email:</span> {user.email}
                                </p>
                                {profile && (
                                    <>
                                        <p className="text-white/80">
                                            <span className="font-semibold text-white">Name:</span> {profile.name}
                                        </p>
                                        <p className="text-white/80">
                                            <span className="font-semibold text-white">College:</span> {profile.college}
                                        </p>
                                        <p className="text-white/80">
                                            <span className="font-semibold text-white">Department:</span> {profile.department}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Account Status</h3>
                            <div className="space-y-2">
                                <p className="text-white/80">
                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                    Active
                                </p>
                                <p className="text-white/80">
                                    <span className="font-semibold text-white">Created:</span> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                Events
                            </Button>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                My Registrations
                            </Button>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
