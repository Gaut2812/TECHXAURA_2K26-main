"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#footer" },
];

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-black/80 backdrop-blur-lg border-b border-white/5"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">TX</span>
                        </div>
                        <span className="text-white font-bold text-xl hidden sm:block">TECHXAURA</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/5">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin"
                            className="text-white/50 hover:text-white text-sm transition-colors hidden sm:block"
                        >
                            Organizers
                        </Link>
                        <Link
                            href="/auth"
                            className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
