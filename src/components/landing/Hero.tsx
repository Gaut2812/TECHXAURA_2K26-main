"use client";

import React from "react";
import { motion } from "framer-motion";
import { StarButton } from "@/components/ui/star-button";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black to-black" />

            {/* Animated glow effects */}
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-b-full bg-gradient-to-b from-cyan-500/20 via-purple-500/15 to-transparent blur-[100px]"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
            />

            <motion.div
                className="absolute bottom-0 left-1/4 w-[40vw] h-[40vh] rounded-full bg-pink-500/10 blur-[120px]"
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    x: [-20, 20, -20],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
            />

            {/* Particle effect overlay */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }} />
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                {/* Event Date Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/80 text-sm font-medium">February 2026 • Chennai</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                >
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        TECHXAURA
                    </span>
                    <br />
                    <span className="text-white">2K26</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
                >
                    Ignite Your Tech Spirit • Technical Symposium of the Year
                    <br />
                    <span className="text-white/40 text-sm">12+ Events • Technical & Non-Technical • ₹100 per Team</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/auth">
                        <StarButton
                            lightColor="#00FFFF"
                            className="px-8 py-3 text-base rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                        >
                            Register Now
                        </StarButton>
                    </Link>

                    <Link
                        href="#events"
                        className="px-8 py-3 text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-300"
                    >
                        Explore Events
                    </Link>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                >
                    {[
                        { value: "12+", label: "Events" },
                        { value: "500+", label: "Participants" },
                        { value: "₹50K+", label: "Prizes" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-white/50 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
                    <div className="w-1 h-2 rounded-full bg-white/40" />
                </div>
            </motion.div>
        </section>
    );
}
