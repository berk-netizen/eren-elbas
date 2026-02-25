"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Edit2, Trash2 } from 'lucide-react';
import { AppMemory } from '@/lib/types';

interface MemoryCardProps {
    memory: AppMemory;
    onEdit: (memory: AppMemory) => void;
    onDelete: (id: string) => void;
}

export function MemoryCard({ memory, onEdit, onDelete }: MemoryCardProps) {
    return (
        <Card className="flex flex-col p-0 overflow-hidden relative">
            <div className="p-4">
                <h4 className="font-bold text-lg mb-1">{memory.title}</h4>
                <p className="text-xs text-primary font-medium mb-3">
                    {new Date(memory.dateISO).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-h-[200px] overflow-y-auto mb-4">
                    {memory.description}
                </p>

                {memory.image && (
                    <div className="w-full h-48 sm:h-56 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 mb-2 shadow-inner">
                        <img
                            src={memory.image}
                            alt={memory.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            <div className="flex border-t border-gray-100 dark:border-white/5 divide-x divide-gray-100 dark:divide-white/5 bg-gray-50 dark:bg-[#2C2C2E]">
                <button
                    onClick={() => onEdit(memory)}
                    className="flex-1 flex justify-center items-center gap-2 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                    <Edit2 size={16} /> Düzenle
                </button>
                <button
                    onClick={() => onDelete(memory.id)}
                    className="flex-1 flex justify-center items-center gap-2 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                    <Trash2 size={16} /> Sil
                </button>
            </div>
        </Card>
    );
}
