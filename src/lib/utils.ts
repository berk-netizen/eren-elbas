import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Parse a YYYY-MM-DD string (or Date) as LOCAL midnight, avoiding UTC timezone shift
function parseLocalDate(date: Date | string): Date {
    if (date instanceof Date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    const [year, month, day] = date.split('T')[0].split('-').map(Number);
    return new Date(year, month - 1, day, 0, 0, 0, 0);
}

export function daysBetween(start: Date | string, end: Date | string): number {
    const d1 = parseLocalDate(start);
    const d2 = parseLocalDate(end);
    const diffTime = d2.getTime() - d1.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function daysUntil(date: Date | string): number {
    const target = parseLocalDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const days = Math.round(diffTime / (1000 * 60 * 60 * 24));

    return days; // negative = past, 0 = today, positive = future
}
