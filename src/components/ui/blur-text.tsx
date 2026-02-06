"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    onAnimationComplete?: () => void;
}

export default function BlurText({
    text,
    className,
    delay = 200,
    animateBy = "words",
    direction = "top",
    onAnimationComplete,
}: BlurTextProps) {
    const words = text.split(" ");
    const letters = text.split("");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay * 0.001 },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: direction === "top" ? -20 : 20,
            filter: "blur(10px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    if (animateBy === "letters") {
        return (
            <motion.div
                className={cn("flex flex-wrap overflow-hidden", className)}
                variants={container}
                initial="hidden"
                animate="visible"
                onAnimationComplete={onAnimationComplete}
            >
                {letters.map((letter, index) => (
                    <motion.span variants={child} key={index}>
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </motion.div>
        );
    }

    return (
        <motion.div
            className={cn("flex flex-wrap overflow-hidden gap-[0.2em]", className)}
            variants={container}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onAnimationComplete}
        >
            {words.map((word, index) => (
                <motion.span variants={child} key={index} className="inline-block">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
