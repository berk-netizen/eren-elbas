"use client";

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

export function Modal({
    isOpen,
    onClose,
    title,
    children
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className={cn(
                "bg-background w-full max-w-[380px] rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col",
                "animate-in fade-in zoom-in-95 duration-200"
            )}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto max-h-[70vh]">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
