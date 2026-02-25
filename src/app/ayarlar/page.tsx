"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { AppConfig } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Heart, ShieldAlert, Trash2 } from "lucide-react";

const CONFIG_ID = '00000000-0000-0000-0000-000000000000';

export default function SettingsPage() {
    const [config, setConfig] = useState<AppConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConfig();
    }, []);

    async function fetchConfig() {
        const { data } = await supabase.from('config').select('*').eq('id', CONFIG_ID).single();
        if (data) setConfig(data);
        setLoading(false);
    }

    const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const relationshipStartDate = e.target.value;
        const { error } = await supabase
            .from('config')
            .update({ relationshipStartDate })
            .eq('id', CONFIG_ID);

        if (!error) {
            setConfig(prev => prev ? { ...prev, relationshipStartDate } : { relationshipStartDate });
        }
    };

    const handleWipeData = async () => {
        if (confirm("TÜM VERİLERİ SİLMEK İSTEDİĞİNİZE EMİN MİSİNİZ?")) {
            await supabase.from('memories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
            await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
            alert("Veriler sıfırlandı.");
            window.location.reload();
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Yükleniyor...</div>;

    return (
        <div className="flex flex-col gap-6">
            <section>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                    <Heart size={16} /> İlişki Bilgileri
                </h3>
                <Card className="flex flex-col gap-4 p-5">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">İlişki Başlangıç Tarihi</label>
                        <input
                            type="date"
                            value={config?.relationshipStartDate}
                            onChange={handleDateChange}
                            className="w-full rounded-xl bg-gray-50 dark:bg-[#2C2C2E] border border-transparent focus:border-primary p-4 h-12 outline-none"
                        />
                    </div>
                </Card>
            </section>

            <section>
                <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2 mt-4">
                    <ShieldAlert size={16} /> Tehlikeli Bölge
                </h3>
                <Card className="flex flex-col gap-4 p-5 border-red-200 bg-red-50/50">
                    <Button variant="danger" className="w-full gap-2 font-bold" onClick={handleWipeData}>
                        <Trash2 size={18} /> Verileri Sıfırla
                    </Button>
                </Card>
            </section>

            <p className="text-center text-xs text-gray-400 mt-8 mb-4">
                Eren Elbaş App v1.0.0 (Supabase Mode)
            </p>
        </div>
    );
}
