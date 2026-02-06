"use client";

import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, X, Upload, Trash2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    onUpload?: (url: string) => void;
    className?: string;
}

export function FileUpload({ onUpload, className }: FileUploadProps) {
    const {
        previewUrl,
        fileName,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove,
    } = useImageUpload({
        onUpload,
    });

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const file = e.dataTransfer.files?.[0];
            if (file && file.type.startsWith("image/")) {
                const fakeEvent = {
                    target: {
                        files: [file],
                    },
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                handleFileChange(fakeEvent);
            }
        },
        [handleFileChange]
    );

    return (
        <div className={cn("w-full space-y-4", className)}>
            <Input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {!previewUrl ? (
                <div
                    onClick={handleThumbnailClick}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "flex h-48 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-white/10 bg-white/5 transition-colors hover:bg-white/10 hover:border-cyan-500/50",
                        isDragging && "border-cyan-500 bg-cyan-500/10"
                    )}
                >
                    <div className="rounded-full bg-white/10 p-3 shadow-sm">
                        <ImagePlus className="h-6 w-6 text-white/60" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-white/80">Click to select</p>
                        <p className="text-xs text-white/40">or drag and drop file here</p>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <div className="group relative h-48 overflow-hidden rounded-xl border border-white/10 bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleThumbnailClick}
                                className="h-9 w-9 p-0"
                            >
                                <Upload className="h-4 w-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={handleRemove}
                                className="h-9 w-9 p-0"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    {fileName && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-white/60">
                            <span className="truncate">{fileName}</span>
                            <button
                                onClick={handleRemove}
                                className="ml-auto rounded-full p-1 hover:bg-white/10 text-white/60 hover:text-white"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
