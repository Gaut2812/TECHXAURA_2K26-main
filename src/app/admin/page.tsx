"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Shield, Users, DollarSign, Calendar, Download, Check, X, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";
// import * as XLSX from "xlsx"; // Removed due to security severity

// Admin credentials (in production, use proper auth)
const ADMIN_USERNAME = "techxaura_admin";
const ADMIN_PASSWORD = "tx2k26@admin";

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(true);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [registrations, setRegistrations] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [stats, setStats] = React.useState({ total: 0, verified: 0, pending: 0, revenue: 0 });
    const [selectedReg, setSelectedReg] = React.useState<any>(null);

    const supabase = createClient();

    const handleLogin = () => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            setShowLogin(false);
            fetchData();
            toast.success("Welcome, Admin!");
        } else {
            toast.error("Invalid credentials");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("registrations")
                .select("*")
                .order("createdAt", { ascending: false });

            if (error) throw error;

            setRegistrations(data || []);

            // Calculate stats
            const verified = (data || []).filter((r: any) => r.paymentStatus === "verified").length;
            const pending = (data || []).filter((r: any) => r.paymentStatus === "pending").length;
            setStats({
                total: data?.length || 0,
                verified,
                pending,
                revenue: verified * 100,
            });
        } catch (error) {
            console.error("Failed to fetch data");
        }
        setLoading(false);
    };

    const updatePaymentStatus = async (id: string, status: "verified" | "rejected") => {
        try {
            const { error } = await supabase
                .from("registrations")
                .update({ paymentStatus: status })
                .eq("id", id);

            if (error) throw error;

            toast.success(`Payment ${status}`);
            fetchData();
            setSelectedReg(null);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const exportToExcel = async () => {
        try {
            const { exportRegistrationsAction } = await import("@/app/actions/registration-actions");
            const base64 = await exportRegistrationsAction();

            // Trigger download
            const link = document.createElement('a');
            link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
            link.download = `TECHXAURA_Registrations_${new Date().toISOString().split("T")[0]}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Excel exported!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to export Excel");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                        <p className="text-white/60 text-sm">TECHXAURA 2K26 Control Panel</p>
                    </div>

                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="admin-user" className="text-white/80">Username</Label>
                            <Input
                                id="admin-user"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admin-pass" className="text-white/80">Password</Label>
                            <Input
                                id="admin-pass"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                        <Button
                            onClick={handleLogin}
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        >
                            Login
                        </Button>
                    </div>

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-white/60">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-white/50 text-sm">TECHXAURA 2K26</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={exportToExcel}
                        className="border-white/10 text-white gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export Excel
                    </Button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Registrations", value: stats.total, icon: Users, color: "cyan" },
                        { label: "Verified Payments", value: stats.verified, icon: Check, color: "green" },
                        { label: "Pending Verification", value: stats.pending, icon: Calendar, color: "yellow" },
                        { label: "Total Revenue", value: `₹${stats.revenue}`, icon: DollarSign, color: "purple" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-xl border border-white/5 bg-white/[0.02]"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-white/50 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Registrations Table */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                    <div className="p-4 border-b border-white/5">
                        <h2 className="text-lg font-semibold text-white">Recent Registrations</h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto" />
                        </div>
                    ) : registrations.length === 0 ? (
                        <div className="p-8 text-center text-white/50">
                            No registrations yet
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/5 text-left">
                                        <th className="p-4 text-white/60 text-sm font-medium">Name</th>
                                        <th className="p-4 text-white/60 text-sm font-medium">Email</th>
                                        <th className="p-4 text-white/60 text-sm font-medium">Events</th>
                                        <th className="p-4 text-white/60 text-sm font-medium">Status</th>
                                        <th className="p-4 text-white/60 text-sm font-medium">Date</th>
                                        <th className="p-4 text-white/60 text-sm font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.map((reg) => (
                                        <tr key={reg.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                            <td className="p-4 text-white">{reg.userName}</td>
                                            <td className="p-4 text-white/70 text-sm">{reg.userEmail}</td>
                                            <td className="p-4 text-white/70 text-sm">
                                                {reg.events?.length || 0} event(s)
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${reg.paymentStatus === "verified"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : reg.paymentStatus === "rejected"
                                                        ? "bg-red-500/20 text-red-400"
                                                        : "bg-yellow-500/20 text-yellow-400"
                                                    }`}>
                                                    {reg.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="p-4 text-white/50 text-sm">
                                                {new Date(reg.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedReg(reg)}
                                                    className="text-cyan-400 hover:text-cyan-300"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Detail Modal */}
            <Dialog open={!!selectedReg} onOpenChange={() => setSelectedReg(null)}>
                <DialogContent className="bg-black/90 border-white/10 max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-white">Registration Details</DialogTitle>
                    </DialogHeader>

                    {selectedReg && (
                        <DialogBody>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-white/50 text-xs">Name</p>
                                        <p className="text-white">{selectedReg.userName}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs">Phone</p>
                                        <p className="text-white">{selectedReg.userPhone}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs">Email</p>
                                        <p className="text-white text-sm">{selectedReg.userEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs">College</p>
                                        <p className="text-white text-sm">{selectedReg.userCollege}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-white/50 text-xs mb-2">Events</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedReg.events?.map((e: any, i: number) => (
                                            <span key={i} className="px-2 py-1 rounded-full bg-white/5 text-white/80 text-xs">
                                                {e.eventName}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-white/50 text-xs mb-2">Payment Screenshot</p>
                                    {selectedReg.paymentScreenshot ? (
                                        <img
                                            src={selectedReg.paymentScreenshot}
                                            alt="Payment"
                                            className="rounded-lg max-h-48 mx-auto"
                                        />
                                    ) : (
                                        <p className="text-white/40 text-sm">No screenshot uploaded</p>
                                    )}
                                </div>
                            </div>
                        </DialogBody>
                    )}

                    <DialogFooter className="bg-white/5">
                        {selectedReg?.paymentStatus === "pending" && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => updatePaymentStatus(selectedReg.id, "rejected")}
                                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Reject
                                </Button>
                                <Button
                                    onClick={() => updatePaymentStatus(selectedReg.id, "verified")}
                                    className="bg-green-500 text-white hover:bg-green-600"
                                >
                                    <Check className="w-4 h-4 mr-1" />
                                    Verify
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
