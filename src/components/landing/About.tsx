"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Users, Trophy, Calendar, Utensils, Clock } from "lucide-react";

const highlights = [
    {
        icon: Zap,
        title: "Technical & Non-Technical",
        description: "12+ diverse events spanning coding, design, gaming, and cultural activities",
    },
    {
        icon: Users,
        title: "Team-Based",
        description: "Form teams of up to 5 members and compete together",
    },
    {
        icon: Trophy,
        title: "Amazing Prizes",
        description: "Win exciting prizes worth ₹50,000+ across all events",
    },
    {
        icon: Calendar,
        title: "One Day Event",
        description: "Action-packed full day of competitions and fun",
    },
    {
        icon: Utensils,
        title: "Food Provided",
        description: "Complimentary meals for all registered participants",
    },
    {
        icon: Clock,
        title: "Multiple Time Slots",
        description: "Participate in multiple events based on timings",
    },
];

export function About() {
    return (
        <section className="relative py-24 bg-black overflow-hidden" id="about">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
                        About The Event
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">TECHXAURA</span>?
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        TECHXAURA 2K26 is the premier technical symposium bringing together students
                        from across the region to compete, learn, and celebrate technology and creativity.
                    </p>
                </motion.div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                            <div className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-white/50 text-sm">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Key Info Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 backdrop-blur-sm"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">Entry Fee: ₹100 per Team</h3>
                            <p className="text-white/60">One payment covers up to 5 team members • Includes food & access to all events</p>
                        </div>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="text-center px-4 border-r border-white/10">
                                <div className="text-3xl font-bold text-cyan-400">5</div>
                                <div className="text-sm text-white/50">Max Members</div>
                            </div>
                            <div className="text-center px-4 border-r border-white/10">
                                <div className="text-3xl font-bold text-purple-400">12+</div>
                                <div className="text-sm text-white/50">Events</div>
                            </div>
                            <div className="text-center px-4">
                                <div className="text-3xl font-bold text-pink-400">1</div>
                                <div className="text-sm text-white/50">Day</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
