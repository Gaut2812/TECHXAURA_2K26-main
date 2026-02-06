"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { EventsProvider } from "@/context/EventsContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <EventsProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </EventsProvider>
        </AuthProvider>
    );
}
