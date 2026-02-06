"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TrailCardProps extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl: string;
    mapImageUrl?: string;
    title: string;
    location: string;
    difficulty: string;
    creators: string;
    distance: string;
    elevation: string;
    duration: string;
    onDirectionsClick?: () => void;
}

const StatItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
    </div>
);

const TrailCard = React.forwardRef<HTMLDivElement, TrailCardProps>(
    (
        {
            className,
            imageUrl,
            mapImageUrl,
            title,
            location,
            difficulty,
            creators,
            distance,
            elevation,
            duration,
            onDirectionsClick,
            ...props
        },
        ref
    ) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "w-full max-w-sm overflow-hidden rounded-2xl bg-card text-card-foreground shadow-lg border border-border",
                    className
                )}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                {...(props as any)}
            >
                <div className="relative h-60 w-full group">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-4">
                        <div className="text-white">
                            <h3 className="text-xl font-bold">{title}</h3>
                            <p className="text-sm text-white/90">{location}</p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            animate={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={onDirectionsClick}
                                className="h-8"
                            >
                                Directions
                                <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                        </motion.div>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="font-bold text-foreground">{difficulty}</p>
                            <p className="text-xs text-muted-foreground">{creators}</p>
                        </div>
                        {mapImageUrl && (
                            <img
                                src={mapImageUrl}
                                alt="Map"
                                className="h-10 w-20 object-contain opacity-50"
                            />
                        )}
                    </div>
                    <div className="my-4 h-px w-full bg-border" />
                    <div className="flex justify-between">
                        <StatItem label="Distance" value={distance} />
                        <StatItem label="Elevation" value={elevation} />
                        <StatItem label="Duration" value={duration} />
                    </div>
                </div>
            </motion.div>
        );
    }
);

TrailCard.displayName = "TrailCard";

export { TrailCard };
