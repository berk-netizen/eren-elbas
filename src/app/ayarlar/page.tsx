"use client";

import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { initialConfig } from "@/lib/dummyData";
import { AppConfig } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Settings, Download, Upload, Trash2, Heart, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
    const [config, setConfig, isLoaded] = useLocalStorageState<AppConfig>("eren_config", initialConfig);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, relationshipStartDate: e.target.value });
    };

    const handleExport = () => {
        const dataToExport = {
            profile: localStorage.getItem('eren_profile'),
            events: localStorage.getItem('eren_events'),
            memories: localStorage.getItem('eren_memories'),
            config: localStorage.getItem('eren_config'),
        };

        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eren-elbas-yedek-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const result = event.target?.result as string;
                const data = JSON.parse(result);

                if (data.profile) localStorage.setItem('eren_profile', data.profile);
                if (data.events) localStorage.setItem('eren_events', data.events);
                if (data.memories) localStorage.setItem('eren_memories', data.memories);
                if (data.config) localStorage.setItem('eren_config', data.config);

                alert("Veriler başarıyla içe aktarıldı! Sayfa yenileniyor...");
                window.location.reload();
            } catch {
                alert("Geçersiz veya bozuk yedekleme dosyası.");
            }
        };
        reader.readAsText(file);

        e.target.value = '';
    };

    const handleWipeData = () => {
        if (confirm("TÜM VERİLERİ SİLMEK İSTEDİĞİNİZE EMİN MİSİNİZ? (Bu işlem geri alınamaz!)")) {
            if (confirm("Gerçekten emin misiniz? Bütün anılar ve etkinlikler gidecek.")) {
                localStorage.removeItem('eren_profile');
                localStorage.removeItem('eren_events');
                localStorage.removeItem('eren_memories');
                localStorage.removeItem('eren_config');
                alert("Veriler silindi. Sayfa yenileniyor.");
                window.location.reload();
            }
        }
    };

    const safeConfig = config || initialConfig;

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 animate-pulse">Yükleniyor...</div>;

    return (
        <div className="flex flex-col gap-6">

            <section>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                    <Heart size={16} /> İlişki Bilgileri
                </h3>
                <Card className="flex flex-col gap-4 p-5">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">İlişki Başlangıç Tarihi</label>
                        <p className="text-xs text-gray-500 mb-3">
                            Bu tarih ana sayfadaki &apos;Birlikte Geçen Günler&apos; sayacını belirler.
                        </p>
                        <input
                            type="date"
                            value={safeConfig.relationshipStartDate}
                            onChange={handleDateChange}
                            className="w-full rounded-xl bg-gray-50 dark:bg-[#2C2C2E] border border-transparent focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-all text-base outline-none"
                        />
                    </div>
                </Card>
            </section>

            <section>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                    <Settings size={16} /> Veri Yönetimi
                </h3>
                <Card className="flex flex-col gap-0 p-0 divide-y divide-gray-100 dark:divide-white/5">
                    <div className="p-5 flex flex-col gap-3">
                        <div>
                            <h4 className="font-bold text-balance">Verileri Dışa Aktar</h4>
                            <p className="text-xs text-gray-500">
                                Tüm uygulamanın yedeğini JSON formatında indirerek güvene alabilirsiniz.
                            </p>
                        </div>
                        <Button variant="secondary" className="w-full justify-start py-6 rounded-lg gap-3 font-medium" onClick={handleExport}>
                            <Download size={18} className="text-primary" /> Yedeği İndir
                        </Button>
                    </div>

                    <div className="p-5 flex flex-col gap-3">
                        <div>
                            <h4 className="font-bold text-balance">Verileri İçe Aktar</h4>
                            <p className="text-xs text-gray-500">
                                Daha önce indirdiğiniz bir yedeği yükleyerek verilerinizi geri getirin. (Mevcut veriler silinir)
                            </p>
                        </div>
                        <div className="relative">
                            <input
                                type="file"
                                accept=".json"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={handleImport}
                            />
                            <Button variant="outline" className="w-full justify-start py-6 rounded-lg gap-3 font-medium cursor-pointer">
                                <Upload size={18} className="text-primary" /> Yedek Yükle
                            </Button>
                        </div>
                    </div>
                </Card>
            </section>

            <section>
                <h3 className="text-sm font-bold text-red-500 dark:text-red-400 uppercase tracking-wider mb-3 px-1 flex items-center gap-2 mt-4">
                    <ShieldAlert size={16} /> Tehlikeli Bölge
                </h3>
                <Card className="flex flex-col gap-4 p-5 border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-900/10">
                    <div>
                        <h4 className="font-bold text-red-600 dark:text-red-400">Her Şeyi Sil</h4>
                        <p className="text-xs text-red-500/80 mt-1">
                            Bu işlem cihazdaki tüm verileri kalıcı olarak siler ve geri alınamaz. Cihazınızı değiştirmeden veya satmadan önce verilerinizi sıfırlamak için kullanın.
                        </p>
                    </div>
                    <Button variant="danger" className="w-full gap-2 font-bold" onClick={handleWipeData}>
                        <Trash2 size={18} /> Verileri Sıfırla
                    </Button>
                </Card>
            </section>

            <p className="text-center text-xs text-gray-400 mt-8 mb-4">
                Eren Elbaş App v1.0.0
            </p>
        </div>
    );
}
