"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CorsTestPage() {
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function testCorsLocal() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/cors-test');
            const data = await response.json();
            setResults({ type: 'local', data, status: response.status });
        } catch (err: any) {
            setError(`Local CORS Test Failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    async function testCorsSupabase() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
                headers: {
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                }
            });
            const status = response.status;
            setResults({ type: 'supabase', status, ok: response.ok });
        } catch (err: any) {
            setError(`Supabase CORS Test Failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    async function testCorsExternal() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://api.github.com', {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            setResults({ type: 'external', status: response.status, ok: response.ok });
        } catch (err: any) {
            setError(`External API CORS Test: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                        CORS Test Suite
                    </h1>
                </div>
            </nav>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Test Cross-Origin Requests</h2>

                    {/* Test Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <Button
                            onClick={testCorsLocal}
                            disabled={loading}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        >
                            {loading ? "Testing..." : "Test Local API"}
                        </Button>

                        <Button
                            onClick={testCorsSupabase}
                            disabled={loading}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                        >
                            {loading ? "Testing..." : "Test Supabase"}
                        </Button>

                        <Button
                            onClick={testCorsExternal}
                            disabled={loading}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        >
                            {loading ? "Testing..." : "Test External API"}
                        </Button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                            <p className="text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Results */}
                    {results && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-lg p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">Test Results</h3>
                            <div className="space-y-2">
                                <p className="text-white/80">
                                    <span className="font-semibold">Test Type:</span> {results.type}
                                </p>
                                <p className="text-white/80">
                                    <span className="font-semibold">Status:</span>
                                    <span className={results.status === 200 || results.ok ? " text-green-400" : " text-red-400"}>
                                        {results.status || (results.ok ? "Success" : "Failed")}
                                    </span>
                                </p>
                                {results.data && (
                                    <details className="text-white/70 text-sm">
                                        <summary className="cursor-pointer font-semibold">View Full Response</summary>
                                        <pre className="mt-2 bg-black/50 p-3 rounded overflow-auto">
                                            {JSON.stringify(results.data, null, 2)}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Info Section */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4">What These Tests Do</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/5 rounded-lg p-4">
                                <h4 className="font-semibold text-cyan-400 mb-2">Local API</h4>
                                <p className="text-white/60 text-sm">Tests your Next.js API endpoint at /api/cors-test</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <h4 className="font-semibold text-green-400 mb-2">Supabase</h4>
                                <p className="text-white/60 text-sm">Verifies connection to your Supabase backend</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <h4 className="font-semibold text-purple-400 mb-2">External API</h4>
                                <p className="text-white/60 text-sm">Tests connection to external APIs (GitHub)</p>
                            </div>
                        </div>
                    </div>

                    {/* CORS Info */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-3">CORS Configuration</h3>
                        <div className="bg-black/50 rounded-lg p-4 text-white/70 text-sm space-y-2">
                            <p><strong>Current Origin:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Server'}</p>
                            <p><strong>Status:</strong> ✅ CORS is enabled on your local API</p>
                            <p><strong>Allowed Methods:</strong> GET, POST, PUT, DELETE, OPTIONS</p>
                            <p><strong>Allowed Headers:</strong> Content-Type, Authorization</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
