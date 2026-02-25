import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function daysBetween(start: Date | string, end: Date | string): number {
    const parseDate = (dateVal: Date | string) => {
        if (typeof dateVal === 'string') {
            const [year, month, day] = dateVal.split('T')[0].split('-').map(Number);
            return new Date(year, month - 1, day, 0, 0, 0, 0);
        }
        const d = new Date(dateVal);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const d1 = parseDate(start);
    const d2 = parseDate(end);
    const diffTime = d2.getTime() - d1.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export function daysUntil(date: Date | string): number {
    const dStr = typeof date === 'string' ? date : date.toISOString();
    const [year, month, day] = dStr.split('T')[0].split('-').map(Number);

    const target = new Date(year, month - 1, day, 0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const days = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
}
