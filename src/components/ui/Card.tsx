import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div className={cn('bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-sm border border-black/5 dark:border-white/5 p-4', className)} {...props}>
            {children}
        </div>
    );
}
