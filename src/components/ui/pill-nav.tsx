"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
}

interface PillNavProps {
    items: NavItem[];
    logo?: string;
    logoAlt?: string;
    activeHref?: string;
    className?: string;
}

export default function PillNav({
    items,
    logo,
    logoAlt,
    activeHref,
    className,
}: PillNavProps) {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    return (
        <nav
            className={cn(
                "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl",
                className
            )}
        >
            {logo && (
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt={logoAlt || "Logo"} className="w-6 h-6" />
                </div>
            )}

            {items.map((item, index) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {hoveredIndex === index && (
                        <motion.div
                            layoutId="pill-nav-hover"
                            className="absolute inset-0 bg-white/10 rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span
                        className={cn(
                            "relative z-10 transition-colors duration-200",
                            activeHref === item.href ? "text-white" : "text-white/60 hover:text-white"
                        )}
                    >
                        {item.label}
                    </span>
                    {activeHref === item.href && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500" />
                    )}
                </Link>
            ))}
        </nav>
    );
}
