"use client";

import { usePathname } from 'next/navigation';

export function Header() {
    const pathname = usePathname();

    const getTitle = () => {
        switch (pathname) {
            case '/': return 'Eren Elbaş ❤️';
            case '/etkinlikler': return 'Etkinlikler';
            case '/anilar': return 'Anılar';
            case '/profil': return 'Profil';
            case '/ayarlar': return 'Ayarlar';
            default: return 'Eren Elbaş ❤️';
        }
    };

    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-white/10 shrink-0 sticky top-0 bg-background/80 backdrop-blur-md z-40">
            <h1 className="text-xl font-bold tracking-tight">{getTitle()}</h1>
        </header>
    );
}
