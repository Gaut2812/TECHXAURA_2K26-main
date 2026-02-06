"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

// Event types from TECHXAURA specs
export interface Event {
    id: string;
    name: string;
    category: "Technical" | "Non-Technical" | "Breakout";
    description: string;
    teamSizeMin: number;
    teamSizeMax: number;
    timing: string;
    timeSlot: string;
    rules: string[];
}

export interface TeamMember {
    name: string;
    email: string;
    phone: string;
    college: string;
}

export interface CartItem {
    event: Event;
    teamMembers: TeamMember[];
}

interface CartContextType {
    items: CartItem[];
    addToCart: (event: Event) => void;
    removeFromCart: (eventId: string) => void;
    updateTeamMembers: (eventId: string, members: TeamMember[]) => void;
    clearCart: () => void;
    getConflicts: (event: Event) => Event[];
    hasConflict: (event: Event) => boolean;
    totalAmount: number;
    isInCart: (eventId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Check for time slot conflicts
    const getConflicts = useCallback((event: Event): Event[] => {
        return items
            .filter(item => item.event.timeSlot === event.timeSlot && item.event.id !== event.id)
            .map(item => item.event);
    }, [items]);

    const hasConflict = useCallback((event: Event): boolean => {
        return items.some(item => item.event.timeSlot === event.timeSlot && item.event.id !== event.id);
    }, [items]);

    const addToCart = useCallback((event: Event) => {
        setItems(prev => {
            // Check if already in cart
            if (prev.some(item => item.event.id === event.id)) {
                return prev;
            }
            return [...prev, { event, teamMembers: [] }];
        });
    }, []);

    const removeFromCart = useCallback((eventId: string) => {
        setItems(prev => prev.filter(item => item.event.id !== eventId));
    }, []);

    const updateTeamMembers = useCallback((eventId: string, members: TeamMember[]) => {
        setItems(prev => prev.map(item =>
            item.event.id === eventId
                ? { ...item, teamMembers: members }
                : item
        ));
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const isInCart = useCallback((eventId: string): boolean => {
        return items.some(item => item.event.id === eventId);
    }, [items]);

    // Fixed entry fee as per specs
    const totalAmount = 100;

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateTeamMembers,
            clearCart,
            getConflicts,
            hasConflict,
            totalAmount,
            isInCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
