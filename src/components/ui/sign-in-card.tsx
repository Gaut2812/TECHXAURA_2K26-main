"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function SignInCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<"email" | "password" | null>(null);
    const [rememberMe, setRememberMe] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm relative z-10"
            style={{ perspective: 1500 }}
        >
            <motion.div
                className="relative"
                style={{ rotateX, rotateY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ z: 10 }}
            >
                <div className="relative group">
                    <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-md" />

                    <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.05] shadow-2xl overflow-hidden">
                        <div className="text-center space-y-1 mb-5">
                            <motion.h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                Welcome Back
                            </motion.h1>
                            <p className="text-white/60 text-xs">Sign in to continue</p>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); setIsLoading(true); setTimeout(() => setIsLoading(false), 2000); }} className="space-y-4">
                            <div className="space-y-3">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                                    <Input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocusedInput("email")}
                                        onBlur={() => setFocusedInput(null)}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusedInput("password")}
                                        onBlur={() => setFocusedInput(null)}
                                        className="pl-10 pr-10"
                                    />
                                    <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 cursor-pointer">
                                        {showPassword ? <Eye className="w-4 h-4 text-white/40" /> : <EyeClosed className="w-4 h-4 text-white/40" />}
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative group/button mt-5 bg-white text-black h-10 rounded-lg font-medium"
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
