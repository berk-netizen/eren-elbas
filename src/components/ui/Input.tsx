import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && <label className="block text-sm font-medium mb-1.5">{label}</label>}
                <input
                    ref={ref}
                    className={cn(
                        "w-full rounded-xl bg-gray-50 dark:bg-[#2C2C2E] border border-transparent focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-all text-base outline-none",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
