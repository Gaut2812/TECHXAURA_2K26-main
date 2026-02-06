"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useCart, TeamMember } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Users, Trash2, Upload, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase";

type CheckoutStep = "review" | "payment" | "thankyou";

export default function CheckoutPage() {
    const { user, profile } = useAuth();
    const { items, removeFromCart, updateTeamMembers, clearCart, totalAmount } = useCart();
    const router = useRouter();
    const supabase = createClient();

    const [step, setStep] = React.useState<CheckoutStep>("review");
    const [teamModalOpen, setTeamModalOpen] = React.useState(false);
    const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
    const [uploading, setUploading] = React.useState(false);
    const [paymentScreenshot, setPaymentScreenshot] = React.useState<string | null>(null);

    // UPI payment details
    const upiId = "techxaura2k26@upi";
    const upiLink = `upi://pay?pa=${upiId}&pn=TECHXAURA&am=${totalAmount}&cu=INR&tn=TECHXAURA2K26Registration`;

    // Team member form handling
    const openTeamModal = (eventId: string) => {
        setSelectedEventId(eventId);
        setTeamModalOpen(true);
    };

    const handleTeamSubmit = (members: TeamMember[]) => {
        if (selectedEventId) {
            updateTeamMembers(selectedEventId, members);
            setTeamModalOpen(false);
            toast.success("Team members saved!");
        }
    };

    // Payment handling
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        setUploading(true);
        try {
            const fileName = `${user?.id}/${Date.now()}_${file.name}`;
            const { data, error } = await supabase.storage
                .from("payment-screenshots")
                .upload(fileName, file);

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from("payment-screenshots")
                .getPublicUrl(data.path);

            setPaymentScreenshot(publicUrl);
            toast.success("Screenshot uploaded!");
        } catch (error) {
            toast.error("Failed to upload screenshot");
        }
        setUploading(false);
    };

    const handleCompletePayment = async () => {
        // Validation: Check for same participant in overlapping events
        const validateConflicts = () => {
            const timeMap = new Map<string, { eventName: string; names: string[] }[]>();

            for (const item of items) {
                // Skip events with no fixed timing or flexible
                if (item.event.timeSlot === 'flexible') continue;

                if (!timeMap.has(item.event.timeSlot)) {
                    timeMap.set(item.event.timeSlot, []);
                }

                // Get all participant names for this event
                const names = item.teamMembers.map(m => m.name.toLowerCase().trim());
                timeMap.get(item.event.timeSlot)?.push({
                    eventName: item.event.name,
                    names
                });
            }

            // Check for overlaps
            for (const [slot, events] of timeMap.entries()) {
                if (events.length <= 1) continue;

                const allNames = new Set<string>();
                const duplicates = new Set<string>();

                events.forEach(e => {
                    e.names.forEach(name => {
                        if (allNames.has(name)) {
                            duplicates.add(name);
                        } else {
                            allNames.add(name);
                        }
                    });
                });

                if (duplicates.size > 0) {
                    const dupNames = Array.from(duplicates).map(n => n.replace(/\b\w/g, c => c.toUpperCase())).join(", ");
                    const eventNames = events.map(e => e.eventName).join(" & ");
                    toast.error(`Conflict: ${dupNames} is registered in ${eventNames} at the same time!`);
                    return false;
                }
            }
            return true;
        };

        if (!validateConflicts()) return;

        if (!paymentScreenshot) {
            toast.error("Please upload payment screenshot");
            return;
        }

        try {
            // Create registration in Supabase
            const registrationData = {
                userId: user?.id,
                userEmail: user?.email,
                userName: profile?.name,
                userPhone: profile?.phone,
                userCollege: profile?.college,
                events: items.map(item => ({
                    eventId: item.event.id,
                    eventName: item.event.name,
                    teamMembers: item.teamMembers,
                })),
                amount: totalAmount,
                paymentScreenshot,
                paymentStatus: "pending",
                createdAt: new Date().toISOString(),
            };

            const { error } = await supabase
                .from("registrations")
                .insert(registrationData);

            if (error) throw error;

            clearCart();
            setStep("thankyou");
        } catch (error) {
            toast.error("Failed to submit registration");
        }
    };

    if (!user) {
        router.push("/auth");
        return null;
    }

    if (items.length === 0 && step !== "thankyou") {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white/60 mb-4">Your cart is empty</p>
                    <Link href="/dashboard">
                        <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                            Explore Events
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="text-white/60">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-white">Checkout</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    {[
                        { key: "review", label: "Review" },
                        { key: "payment", label: "Payment" },
                        { key: "thankyou", label: "Complete" },
                    ].map((s, i) => (
                        <React.Fragment key={s.key}>
                            <div className={`flex items-center gap-2 ${step === s.key ? "text-cyan-400" : s.key === "thankyou" && step === "thankyou" ? "text-green-400" : "text-white/40"}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === s.key ? "bg-cyan-500/20 border border-cyan-500" :
                                    (s.key === "review" && step !== "review") || (s.key === "payment" && step === "thankyou")
                                        ? "bg-green-500/20 border border-green-500 text-green-400"
                                        : "bg-white/5 border border-white/10"
                                    }`}>
                                    {((s.key === "review" && step !== "review") || (s.key === "payment" && step === "thankyou")) ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                <span className="text-sm font-medium hidden sm:block">{s.label}</span>
                            </div>
                            {i < 2 && <div className="w-12 h-px bg-white/10 mx-2" />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step Content */}
                {step === "review" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-2xl font-bold text-white mb-6">Review Your Cart</h2>

                        {/* Cart Items */}
                        <div className="space-y-4 mb-8">
                            {items.map((item) => (
                                <div key={item.event.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-white font-semibold">{item.event.name}</h3>
                                            <p className="text-white/50 text-sm">{item.event.category} • {item.event.timing}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFromCart(item.event.id)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Team Members */}
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-white/60 text-sm">
                                                <Users className="w-4 h-4" />
                                                <span>
                                                    {item.teamMembers.length > 0
                                                        ? `${item.teamMembers.length} member${item.teamMembers.length > 1 ? "s" : ""} added`
                                                        : "No team members added"}
                                                </span>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openTeamModal(item.event.id)}
                                                className="border-white/10 text-white/70"
                                            >
                                                {item.teamMembers.length > 0 ? "Edit Team" : "Add Team"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="p-6 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-white/60">Total Events</span>
                                <span className="text-white font-semibold">{items.length}</span>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-white/60">Entry Fee</span>
                                <span className="text-2xl font-bold text-cyan-400">₹{totalAmount}</span>
                            </div>
                            <p className="text-white/40 text-xs mb-4">* One payment covers your entire team (up to 5 members)</p>
                            <Button
                                onClick={() => setStep("payment")}
                                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                            >
                                Continue to Payment
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === "payment" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Complete Payment</h2>
                        <p className="text-white/60 mb-8">Scan the QR code or use UPI ID to pay</p>

                        {/* QR Code */}
                        <div className="inline-block p-6 bg-white rounded-2xl mb-6">
                            <QRCodeSVG value={upiLink} size={200} />
                        </div>

                        <p className="text-white/60 text-sm mb-2">UPI ID</p>
                        <p className="text-cyan-400 font-mono text-lg mb-8">{upiId}</p>

                        {/* Upload Section */}
                        <div className="max-w-md mx-auto">
                            <p className="text-white/80 font-medium mb-4">Upload Payment Screenshot</p>

                            {paymentScreenshot ? (
                                <div className="relative mb-4">
                                    <img src={paymentScreenshot} alt="Payment" className="rounded-xl max-h-48 mx-auto" />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPaymentScreenshot(null)}
                                        className="mt-2 border-white/10 text-white/70"
                                    >
                                        Change Screenshot
                                    </Button>
                                </div>
                            ) : (
                                <label className="block cursor-pointer mb-6">
                                    <div className="p-8 border-2 border-dashed border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors">
                                        <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                                        <p className="text-white/60 text-sm">Click to upload</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                </label>
                            )}

                            <Button
                                onClick={handleCompletePayment}
                                disabled={!paymentScreenshot || uploading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white disabled:opacity-50"
                            >
                                {uploading ? "Uploading..." : "Complete Registration"}
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === "thankyou" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Registration Submitted!</h2>
                        <p className="text-white/60 max-w-md mx-auto mb-8">
                            Your registration has been submitted successfully. Our team will verify your payment and send a confirmation email shortly.
                        </p>
                        <Link href="/">
                            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                                Back to Home
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </main>

            {/* Team Modal */}
            <TeamMemberModal
                open={teamModalOpen}
                onClose={() => setTeamModalOpen(false)}
                event={items.find(i => i.event.id === selectedEventId)?.event}
                existingMembers={items.find(i => i.event.id === selectedEventId)?.teamMembers || []}
                onSubmit={handleTeamSubmit}
            />
        </div>
    );
}

// Team Member Modal Component
function TeamMemberModal({
    open,
    onClose,
    event,
    existingMembers,
    onSubmit
}: {
    open: boolean;
    onClose: () => void;
    event?: any;
    existingMembers: TeamMember[];
    onSubmit: (members: TeamMember[]) => void;
}) {
    const [members, setMembers] = React.useState<TeamMember[]>(existingMembers);

    React.useEffect(() => {
        setMembers(existingMembers);
    }, [existingMembers, open]);

    if (!event) return null;

    const addMember = () => {
        if (members.length < event.teamSizeMax) {
            setMembers([...members, { name: "", email: "", phone: "", college: "" }]);
        }
    };

    const updateMember = (index: number, field: keyof TeamMember, value: string) => {
        const updated = [...members];
        updated[index] = { ...updated[index], [field]: value };
        setMembers(updated);
    };

    const removeMember = (index: number) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (members.length < event.teamSizeMin) {
            toast.error(`Minimum ${event.teamSizeMin} team members required`);
            return;
        }
        onSubmit(members);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-black/90 border-white/10 max-w-lg max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-white">Team Members - {event.name}</DialogTitle>
                    <DialogDescription className="text-white/60">
                        Add {event.teamSizeMin}-{event.teamSizeMax} team members
                    </DialogDescription>
                </DialogHeader>

                <DialogBody className="overflow-y-auto max-h-[50vh]">
                    <div className="space-y-4">
                        {members.map((member, index) => (
                            <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white/80 text-sm font-medium">Member {index + 1}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeMember(index)}
                                        className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label className="text-white/60 text-xs">Name</Label>
                                        <Input
                                            value={member.name}
                                            onChange={(e) => updateMember(index, "name", e.target.value)}
                                            className="bg-white/5 border-white/10 text-white text-sm h-8"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-white/60 text-xs">Email</Label>
                                        <Input
                                            type="email"
                                            value={member.email}
                                            onChange={(e) => updateMember(index, "email", e.target.value)}
                                            className="bg-white/5 border-white/10 text-white text-sm h-8"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-white/60 text-xs">Phone</Label>
                                        <Input
                                            value={member.phone}
                                            onChange={(e) => updateMember(index, "phone", e.target.value)}
                                            className="bg-white/5 border-white/10 text-white text-sm h-8"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-white/60 text-xs">College</Label>
                                        <Input
                                            value={member.college}
                                            onChange={(e) => updateMember(index, "college", e.target.value)}
                                            className="bg-white/5 border-white/10 text-white text-sm h-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {members.length < event.teamSizeMax && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={addMember}
                            className="mt-4 w-full border-dashed border-white/10 text-white/60"
                        >
                            + Add Member
                        </Button>
                    )}
                </DialogBody>

                <DialogFooter className="bg-white/5">
                    <Button variant="outline" onClick={onClose} className="border-white/10 text-white/70">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    >
                        Save Team
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
