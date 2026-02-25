"use client";

import { useState } from 'react';
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { initialConfig, initialEvents } from "@/lib/dummyData";
import { daysBetween, daysUntil } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AppConfig, AppEvent } from "@/lib/types";
import { Heart, Calendar, ArrowRight, Image as ImageIcon } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  const [config, , isLoadedConfig] = useLocalStorageState<AppConfig>("eren_config", initialConfig);
  const [events, , isLoadedEvents] = useLocalStorageState<AppEvent[]>("eren_events", initialEvents);

  const [isAddOpen, setIsAddOpen] = useState(false);

  // We should make sure we don't have hydration mismatch by waiting for client load, 
  // but since we read from localStorage it might run right away on initial render anyway.
  // We'll wrap in a component or just handle it if there's a flicker.
  const daysTogether = config ? daysBetween(config.relationshipStartDate, new Date()) : 0;

  const upcomingEvents = events
    ? events
      .map(e => ({ ...e, daysLeft: daysUntil(e.dateISO) }))
      .filter(e => e.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 3)
    : [];

  if (!isLoadedConfig || !isLoadedEvents) return <div className="p-8 text-center text-gray-500 animate-pulse">Yükleniyor...</div>;

  return (
    <div className="flex flex-col gap-6">
      <section>
        <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white border-none shadow-lg shadow-primary-500/30 text-center py-8">
          <Heart className="mx-auto mb-4 animate-pulse text-white" fill="white" size={48} />
          <p className="text-primary-100 font-medium mb-1">Birlikte Geçen</p>
          <h2 className="text-5xl font-black tracking-tight">{daysTogether}</h2>
          <p className="text-primary-100 font-medium mt-1">Muhteşem Gün</p>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Yaklaşan Günler</h3>
          <Link href="/etkinlikler" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            Tümü <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <Card key={event.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary flex items-center justify-center shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(event.dateISO).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{event.daysLeft}</div>
                  <div className="text-xs text-gray-500">gün</div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="py-8 text-center text-gray-500 border-dashed">
              Yaklaşan etkinlik bulunmuyor.
            </Card>
          )}
        </div>
      </section>

      <FloatingActionButton onClick={() => setIsAddOpen(true)} />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Hızlı Ekle">
        <div className="flex flex-col gap-3">
          <Button variant="outline" className="justify-start gap-3 h-14" onClick={() => { setIsAddOpen(false); /* TODO Route */ }}>
            <Calendar className="text-primary" />
            Yeni Etkinlik Ekle
          </Button>
          <Button variant="outline" className="justify-start gap-3 h-14" onClick={() => { setIsAddOpen(false); /* TODO Route */ }}>
            <ImageIcon className="text-primary" />
            Yeni Anı Ekle
          </Button>
        </div>
      </Modal>
    </div>
  );
}
