"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Event } from "./CartContext";

// Sample events data - in production, this would come from Supabase
const eventsData: Event[] = [
    // Technical Events
    { id: "mindsparkx", name: "MindSparkX", category: "Technical", description: "Quiz & Problem Solving Challenge", teamSizeMin: 1, teamSizeMax: 3, timing: "10:00 AM - 12:00 PM", timeSlot: "morning", rules: ["Individual or team of 3", "MCQ and puzzle rounds", "Top 3 teams advance to finals"] },
    { id: "designomania", name: "Design-O-Mania", category: "Technical", description: "Design Competition", teamSizeMin: 1, teamSizeMax: 2, timing: "10:00 AM - 12:00 PM", timeSlot: "morning", rules: ["Bring your own laptop", "Design software of choice", "Theme will be given on spot"] },
    { id: "businessbattle", name: "Business Battle", category: "Technical", description: "Business Case Study", teamSizeMin: 2, teamSizeMax: 4, timing: "2:00 PM - 4:00 PM", timeSlot: "afternoon", rules: ["Team presentation", "Case study provided", "15 min presentation per team"] },
    { id: "fixtheglitch", name: "Fix The Glitch", category: "Technical", description: "Debugging Challenge", teamSizeMin: 1, teamSizeMax: 2, timing: "2:00 PM - 4:00 PM", timeSlot: "afternoon", rules: ["Find and fix bugs", "Multiple programming languages", "Time-based scoring"] },
    { id: "paperpresentation", name: "Paper Presentation", category: "Technical", description: "Research Presentation", teamSizeMin: 1, teamSizeMax: 2, timing: "10:00 AM - 12:00 PM", timeSlot: "morning", rules: ["IEEE format", "8-10 pages", "Any technical topic"] },
    // Non-Technical Events
    { id: "startmusic", name: "Start Music", category: "Non-Technical", description: "Music Competition", teamSizeMin: 1, teamSizeMax: 3, timing: "2:00 PM - 4:00 PM", timeSlot: "afternoon", rules: ["Solo or group", "Any genre", "5-7 minutes per performance"] },
    { id: "boxcricket", name: "Box Cricket", category: "Non-Technical", description: "Indoor Cricket Tournament", teamSizeMin: 4, teamSizeMax: 5, timing: "10:00 AM - 4:00 PM", timeSlot: "fullday", rules: ["5 players per team", "6 overs per innings", "Standard rules apply"] },
    { id: "esports", name: "E-Sports", category: "Non-Technical", description: "Gaming Tournament", teamSizeMin: 1, teamSizeMax: 4, timing: "10:00 AM - 4:00 PM", timeSlot: "fullday", rules: ["BGMI/Valorant", "Own devices", "Tournament format"] },
    { id: "clashoftalents", name: "Clash of Talents", category: "Non-Technical", description: "Talent Show", teamSizeMin: 1, teamSizeMax: 3, timing: "2:00 PM - 4:00 PM", timeSlot: "afternoon", rules: ["Any talent", "5 min performance", "Props allowed"] },
    { id: "iplauction", name: "IPL Auction", category: "Non-Technical", description: "Mock IPL Auction", teamSizeMin: 3, teamSizeMax: 5, timing: "10:00 AM - 12:00 PM", timeSlot: "morning", rules: ["Virtual money", "Strategy-based", "Build your team"] },
    // Breakout Events
    { id: "carrom", name: "Carrom 2.0", category: "Breakout", description: "Carrom Tournament", teamSizeMin: 2, teamSizeMax: 2, timing: "Flexible", timeSlot: "flexible", rules: ["Doubles only", "Standard rules", "Knockout format"] },
    { id: "vaangapazhagalam", name: "Vaanga Pazhagalam", category: "Breakout", description: "Tamil Cultural Event", teamSizeMin: 2, teamSizeMax: 4, timing: "Flexible", timeSlot: "flexible", rules: ["Tamil traditions", "Interactive games", "Cultural activities"] },
];

interface EventsContextType {
    events: Event[];
    loading: boolean;
    categories: string[];
    filterByCategory: (category: string) => Event[];
    searchEvents: (query: string) => Event[];
    getEventById: (id: string) => Event | undefined;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching from Supabase
        // In production: fetch from supabase.from('events').select('*')
        setTimeout(() => {
            setEvents(eventsData);
            setLoading(false);
        }, 500);
    }, []);

    const categories = ["All", "Technical", "Non-Technical", "Breakout"];

    const filterByCategory = (category: string): Event[] => {
        if (category === "All") return events;
        return events.filter(e => e.category === category);
    };

    const searchEvents = (query: string): Event[] => {
        const q = query.toLowerCase();
        return events.filter(e =>
            e.name.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q)
        );
    };

    const getEventById = (id: string): Event | undefined => {
        return events.find(e => e.id === id);
    };

    return (
        <EventsContext.Provider value={{
            events,
            loading,
            categories,
            filterByCategory,
            searchEvents,
            getEventById,
        }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventsContext);
    if (context === undefined) {
        throw new Error("useEvents must be used within an EventsProvider");
    }
    return context;
}
