"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check } from "lucide-react";

interface RulesDialogProps {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
    rules: string[];
    eventName: string;
}

export function RulesDialog({ open, onClose, onAccept, rules = [], eventName }: RulesDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-black/90 border-white/10 max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        Rules & Regulations
                    </DialogTitle>
                    <DialogDescription className="text-white/60">
                        Please review the rules for <span className="text-cyan-400 font-semibold">{eventName}</span>
                    </DialogDescription>
                </DialogHeader>

                <DialogBody>
                    <div className="space-y-4 py-4">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                            <ul className="space-y-3">
                                {rules?.length > 0 ? (
                                    rules.map((rule, index) => (
                                        <li key={index} className="flex items-start gap-3 text-white/80 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                                            <span>{rule}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-white/60 text-sm text-center italic">No specific rules mentioned.</li>
                                )}
                            </ul>
                        </div>
                        <p className="text-xs text-white/40 text-center">
                            By clicking accept, you agree to abide by these rules.
                        </p>
                    </div>
                </DialogBody>

                <DialogFooter className="bg-white/5">
                    <Button variant="outline" onClick={onClose} className="border-white/10 text-white/70">
                        Cancel
                    </Button>
                    <Button
                        onClick={onAccept}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
                    >
                        <Check className="w-4 h-4 mr-2" />
                        Accept & Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
