"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Event, useCart } from "@/context/CartContext";
import { Users, Clock, ShoppingCart, AlertTriangle, Check } from "lucide-react";

import { RulesDialog } from "./RulesDialog";

interface EventCardProps {
    event: Event;
    onViewDetails?: () => void;
}

export function EventCard({ event, onViewDetails }: EventCardProps) {
    const [showRules, setShowRules] = React.useState(false);
    const { addToCart, removeFromCart, isInCart, hasConflict, getConflicts } = useCart();
    const inCart = isInCart(event.id);
    const hasTimeConflict = hasConflict(event);
    const conflicts = getConflicts(event);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "Technical": return "from-cyan-500 to-blue-500";
            case "Non-Technical": return "from-purple-500 to-pink-500";
            case "Breakout": return "from-orange-500 to-yellow-500";
            default: return "from-gray-500 to-gray-600";
        }
    };

    const handleCartAction = () => {
        if (inCart) {
            removeFromCart(event.id);
        } else {
            setShowRules(true);
        }
    };

    const handleAcceptRules = () => {
        addToCart(event);
        setShowRules(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group relative"
        >
            <div className="relative h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-all duration-300 flex flex-col">
                {/* Category Badge */}
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(event.category)} text-white w-fit mb-4`}>
                    {event.category}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">{event.name}</h3>
                <p className="text-white/50 text-sm mb-4 flex-grow">{event.description}</p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                        <Users className="w-3 h-3" />
                        <span>{event.teamSizeMin === event.teamSizeMax ? event.teamSizeMin : `${event.teamSizeMin}-${event.teamSizeMax}`} members</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        <span>{event.timing}</span>
                    </div>
                </div>

                {/* Conflict Warning */}
                {hasTimeConflict && !inCart && (
                    <div className="mb-3 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-start gap-2 text-xs text-yellow-400">
                            <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>Time Overlap with: {conflicts.map(c => c.name).join(", ")}</span>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onViewDetails}
                        className="flex-1 border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                    >
                        Details
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleCartAction}
                        className={`flex-1 ${inCart
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
                            }`}
                    >
                        {inCart ? (
                            <>
                                <Check className="w-4 h-4 mr-1" />
                                Added
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Add
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <RulesDialog
                open={showRules}
                onClose={() => setShowRules(false)}
                onAccept={handleAcceptRules}
                rules={event.rules}
                eventName={event.name}
            />
        </motion.div>
    );
}
