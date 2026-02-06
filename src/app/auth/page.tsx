"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { LoginForm } from "@/components/auth/LoginForm";
import toast from "react-hot-toast";

function AuthPageContent() {
    const [isLogin, setIsLogin] = React.useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const error = searchParams.get('error');
        const error_description = searchParams.get('error_description');
        
        if (error) {
            const message = error_description || error;
            toast.error(`OAuth Error: ${message}`);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-black flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />

                {/* Animated blobs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/30 blur-[100px]"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "mirror",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/30 blur-[100px]"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        repeatType: "mirror",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
                    <Link href="/" className="flex items-center gap-3 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">TX</span>
                        </div>
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-4">TECHXAURA 2K26</h1>
                    <p className="text-white/60 text-lg max-w-md">
                        Join the premier technical symposium. Register your team, explore events, and compete for amazing prizes.
                    </p>

                    <div className="mt-12 grid grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-cyan-400">12+</div>
                            <div className="text-white/50 text-sm">Events</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-400">500+</div>
                            <div className="text-white/50 text-sm">Participants</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-pink-400">₹50K</div>
                            <div className="text-white/50 text-sm">In Prizes</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Forms */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">TX</span>
                            </div>
                            <span className="text-white font-bold text-xl">TECHXAURA</span>
                        </Link>
                    </div>

                    {/* Toggle Tabs */}
                    <div className="flex mb-8 p-1 rounded-full bg-white/5">
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${!isLogin
                                    ? "bg-white text-black"
                                    : "text-white/60 hover:text-white"
                                }`}
                        >
                            Register
                        </button>
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${isLogin
                                    ? "bg-white text-black"
                                    : "text-white/60 hover:text-white"
                                }`}
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Form Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-white/50 text-sm">
                            {isLogin
                                ? "Sign in to access your dashboard and manage registrations"
                                : "Join TECHXAURA 2K26 and showcase your talents"}
                        </p>
                    </div>

                    {/* Forms */}
                    {isLogin ? <LoginForm /> : <RegisterForm />}

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-cyan-500 border-t-purple-500 rounded-full animate-spin" />
            </div>
        }>
            <AuthPageContent />
        </Suspense>
    );
}
