"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar, Trash2, Edit2 } from 'lucide-react';
import { AppEvent } from '@/lib/types';
import { daysUntil } from '@/lib/utils';

interface EventCardProps {
    event: AppEvent;
    onEdit: (event: AppEvent) => void;
    onDelete: (id: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
    const daysLeft = daysUntil(event.dateISO);

    return (
        <Card className="flex flex-col p-0 overflow-hidden group">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-[#1C1C1E]">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary flex items-center justify-center shrink-0">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-base">{event.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(event.dateISO).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                <div className="text-right flex flex-col items-end">
                    {daysLeft > 0 ? (
                        <>
                            <div className="text-xl font-black text-primary">{daysLeft}</div>
                            <div className="text-xs text-gray-500 font-medium tracking-wide uppercase">gün kaldı</div>
                        </>
                    ) : daysLeft === 0 ? (
                        <div className="text-primary font-bold text-sm bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">Bugün!</div>
                    ) : (
                        <div className="text-gray-400 font-bold text-sm bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full">Geçti</div>
                    )}
                </div>
            </div>

            {/* Actions reveal on swipe or tap */}
            <div className="flex border-t border-gray-100 dark:border-white/5 divide-x divide-gray-100 dark:divide-white/5 bg-gray-50 dark:bg-[#2C2C2E]">
                <button
                    onClick={() => onEdit(event)}
                    className="flex-1 flex justify-center items-center gap-2 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                    <Edit2 size={16} /> Düzenle
                </button>
                <button
                    onClick={() => onDelete(event.id)}
                    className="flex-1 flex justify-center items-center gap-2 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                    <Trash2 size={16} /> Sil
                </button>
            </div>
        </Card>
    );
}
