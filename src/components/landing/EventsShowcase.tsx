"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Gamepad2, Mic2, Trophy, Users, Palette, FileText, Bug, Clapperboard, CircleDot } from "lucide-react";

// Event data based on TECHXAURA_2K26_System_Prompt.md
const events = [
    // Technical Events
    { id: "mindsparkx", name: "MindSparkX", category: "Technical", icon: Code2, teamSize: "1-3", timing: "10:00 AM - 12:00 PM", description: "Quiz & Problem Solving Challenge" },
    { id: "designomania", name: "Design-O-Mania", category: "Technical", icon: Palette, teamSize: "1-2", timing: "10:00 AM - 12:00 PM", description: "Design Competition" },
    { id: "businessbattle", name: "Business Battle", category: "Technical", icon: Trophy, teamSize: "2-4", timing: "2:00 PM - 4:00 PM", description: "Business Case Study" },
    { id: "fixtheglitch", name: "Fix The Glitch", category: "Technical", icon: Bug, teamSize: "1-2", timing: "2:00 PM - 4:00 PM", description: "Debugging Challenge" },
    { id: "paperpresentation", name: "Paper Presentation", category: "Technical", icon: FileText, teamSize: "1-2", timing: "10:00 AM - 12:00 PM", description: "Research Presentation" },
    // Non-Technical Events
    { id: "startmusic", name: "Start Music", category: "Non-Technical", icon: Mic2, teamSize: "1-3", timing: "2:00 PM - 4:00 PM", description: "Music Competition" },
    { id: "boxcricket", name: "Box Cricket", category: "Non-Technical", icon: CircleDot, teamSize: "4-5", timing: "10:00 AM - 4:00 PM", description: "Indoor Cricket Tournament" },
    { id: "esports", name: "E-Sports", category: "Non-Technical", icon: Gamepad2, teamSize: "1-4", timing: "10:00 AM - 4:00 PM", description: "Gaming Tournament" },
    { id: "clashoftalents", name: "Clash of Talents", category: "Non-Technical", icon: Clapperboard, teamSize: "1-3", timing: "2:00 PM - 4:00 PM", description: "Talent Show" },
    { id: "iplauction", name: "IPL Auction", category: "Non-Technical", icon: Trophy, teamSize: "3-5", timing: "10:00 AM - 12:00 PM", description: "Mock IPL Auction" },
    // Breakout Events
    { id: "carrom", name: "Carrom 2.0", category: "Breakout", icon: CircleDot, teamSize: "2", timing: "Flexible", description: "Carrom Tournament" },
    { id: "vaangapazhagalam", name: "Vaanga Pazhagalam", category: "Breakout", icon: Users, teamSize: "2-4", timing: "Flexible", description: "Tamil Cultural Event" },
];

const categories = ["All", "Technical", "Non-Technical", "Breakout"];

export function EventsShowcase() {
    const [activeCategory, setActiveCategory] = React.useState("All");

    const filteredEvents = activeCategory === "All"
        ? events
        : events.filter(e => e.category === activeCategory);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "Technical": return "from-cyan-500 to-blue-500";
            case "Non-Technical": return "from-purple-500 to-pink-500";
            case "Breakout": return "from-orange-500 to-yellow-500";
            default: return "from-gray-500 to-gray-600";
        }
    };

    return (
        <section className="relative py-24 bg-black overflow-hidden" id="events">
            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
                        Explore Events
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Arena</span>
                    </h2>
                    <p className="text-white/60 max-w-xl mx-auto">
                        12+ events across technical, non-technical, and breakout categories. Something for everyone!
                    </p>
                </motion.div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                    ? "bg-white text-black"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"
                                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />

                            <div className="relative h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-all duration-300 flex flex-col">
                                {/* Category Badge */}
                                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(event.category)} text-white w-fit mb-4`}>
                                    {event.category}
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                                    <event.icon className="w-6 h-6 text-white/70" />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-white mb-2">{event.name}</h3>
                                <p className="text-white/50 text-sm mb-4 flex-grow">{event.description}</p>

                                {/* Meta Info */}
                                <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-4 mt-auto">
                                    <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {event.teamSize} members
                                    </span>
                                    <span>{event.timing}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Entry Fee Reminder */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-white/50 text-sm">
                        All events are covered under a single <span className="text-cyan-400 font-semibold">₹100</span> team registration fee
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
