"use client";

import { useState } from 'react';
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { initialEvents } from "@/lib/dummyData";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EventCard } from "@/components/EventCard";
import { AppEvent } from "@/lib/types";

export default function EventsPage() {
    const [events, setEvents, isLoaded] = useLocalStorageState<AppEvent[]>("eren_events", initialEvents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<AppEvent | null>(null);

    const handleOpenAdd = () => {
        setEditingEvent(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (event: AppEvent) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Bu etkinliği silmek istediğinize emin misiniz?')) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const dateISO = formData.get('dateISO') as string;

        if (editingEvent) {
            setEvents(events.map(ev => ev.id === editingEvent.id ? { ...ev, title, dateISO } : ev));
        } else {
            setEvents([...events, { id: Date.now().toString(), title, dateISO, iconType: 'calendar' }]);
        }
        setIsModalOpen(false);
    };

    // Safe fallback if events is null during hydration
    const activeEvents = events || [];

    // Group events by month/year
    const groupedEvents = activeEvents.reduce((acc, current) => {
        const d = new Date(current.dateISO);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(current);
        return acc;
    }, {} as Record<string, AppEvent[]>);

    // Sort groups by date descending
    const sortedKeys = Object.keys(groupedEvents).sort((a, b) => {
        const [yearA, monthA] = a.split('-').map(Number);
        const [yearB, monthB] = b.split('-').map(Number);
        if (yearA !== yearB) return yearB - yearA;
        return monthB - monthA;
    });

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 animate-pulse">Yükleniyor...</div>;

    return (
        <div className="flex flex-col gap-6">
            {sortedKeys.length === 0 && (
                <div className="text-center text-gray-500 py-10 mt-10">Hiç etkinlik yok. Eklemek için + butonuna tıkla.</div>
            )}

            {sortedKeys.map(key => {
                const [year, month] = key.split('-');
                const monthName = new Date(Number(year), Number(month)).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

                // Sort events in the group by date
                const groupEvents = groupedEvents[key].sort((a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime());

                return (
                    <div key={key} className="flex flex-col gap-3">
                        <h3 className="sticky top-16 bg-background/95 backdrop-blur-sm py-2 text-sm font-bold text-gray-500 z-10 px-1 uppercase tracking-wider">
                            {monthName}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {groupEvents.map(event => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onEdit={handleOpenEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}

            <FloatingActionButton onClick={handleOpenAdd} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEvent ? "Etkinliği Düzenle" : "Yeni Etkinlik Ekle"}>
                <form onSubmit={handleSave} className="flex flex-col gap-4 mt-2">
                    <Input
                        name="title"
                        label="Etkinlik Adı"
                        defaultValue={editingEvent?.title}
                        placeholder="Örn: Doğum Günü"
                        required
                    />
                    <Input
                        name="dateISO"
                        label="Tarih"
                        type="date"
                        defaultValue={editingEvent?.dateISO}
                        required
                    />
                    <div className="pt-4">
                        <Button type="submit" className="w-full">
                            {editingEvent ? "Güncelle" : "Ekle"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
