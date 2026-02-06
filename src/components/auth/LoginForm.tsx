"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LoginFormData {
    email: string;
    password: string;
}

export function LoginForm() {
    const { signIn, signInWithGoogle } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    async function onSubmit(data: LoginFormData) {
        setLoading(true);
        try {
            const { error } = await signIn(data.email, data.password);

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Welcome back!");
                router.push("/dashboard");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        }
        setLoading(false);
    }

    async function handleGoogleSignIn() {
        const { error } = await signInWithGoogle();
        if (error) {
            toast.error(error.message);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white/80">Email</Label>
                    <Input
                        id="login-email"
                        type="email"
                        placeholder="you@gmail.com"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                    {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white/80">Password</Label>
                    <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                    {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-black px-4 text-white/40">or continue with</span>
                </div>
            </div>

            {/* Google Sign In */}
            <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full border-white/10 text-white hover:bg-white/5"
            >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
            </Button>
        </motion.div>
    );
}
