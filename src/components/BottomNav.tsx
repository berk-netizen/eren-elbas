"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Image as ImageIcon, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/', icon: Home, label: 'Ana Sayfa' },
    { href: '/etkinlikler', icon: Calendar, label: 'Etkinlikler' },
    { href: '/anilar', icon: ImageIcon, label: 'Anılar' },
    { href: '/profil', icon: User, label: 'Profil' },
    { href: '/ayarlar', icon: Settings, label: 'Ayarlar' },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="h-20 border-t border-gray-200 dark:border-white/10 shrink-0 sticky bottom-0 bg-background/80 backdrop-blur-md z-40 pb-4">
            <ul className="flex justify-around items-center h-full px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <li key={item.href} className="flex-1 flex justify-center">
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                                    isActive ? "text-primary dark:text-primary-400" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
                                )}
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
