import React from 'react';

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-black">
            <div className="w-full max-w-[420px] bg-background text-foreground min-h-screen relative shadow-2xl flex flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}
