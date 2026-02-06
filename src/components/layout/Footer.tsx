"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/5 py-16" id="footer">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">TX</span>
                            </div>
                            <span className="text-white font-bold text-xl">TECHXAURA 2K26</span>
                        </div>
                        <p className="text-white/50 text-sm max-w-md mb-6">
                            The premier technical symposium bringing together students from across the region
                            to compete, learn, and celebrate technology and creativity.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Home", href: "/" },
                                { label: "About", href: "#about" },
                                { label: "Events", href: "#events" },
                                { label: "Register", href: "/auth" },
                                { label: "Admin Login", href: "/admin" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-white/50 text-sm">
                                <Mail className="w-4 h-4" />
                                <span>techxaura2k26@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/50 text-sm">
                                <Phone className="w-4 h-4" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/50 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <span>Chennai, Tamil Nadu, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm">
                        © 2026 TECHXAURA. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-white/40 text-sm">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
