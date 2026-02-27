"use client";

import { useState, useEffect, useRef } from 'react';
import { supabase } from "@/lib/supabase";
import { AppProfilePreferences } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Camera, Save, Settings, Heart, StickyNote } from "lucide-react";

const PROFILE_ID = '00000000-0000-0000-0000-000000000000';
const CONFIG_ID = '00000000-0000-0000-0000-000000000000';

export default function ProfileDashboard() {
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Profile State
    const [form, setForm] = useState({
        name: "",
        bio: "",
        avatar_url: "",
        ringSize: "",
        coffeePreference: "",
        favoriteColor: "",
        favoriteFood: "",
        favoritePolitician: "",
        supportedParty: "",
        favoriteYDCharacter: "",
        favoriteTimePeriod: "",
        firstDateLocation: "",
        importantNote: ""
    });

    const [anniversaryDate, setAnniversaryDate] = useState("");
    const [preferences, setPreferences] = useState<AppProfilePreferences>({
        showEvents: true,
        showMemories: true
    });

    // Image Upload State
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const [profileRes, configRes] = await Promise.all([
                supabase.from('profile').select('*').eq('id', PROFILE_ID).single(),
                supabase.from('config').select('*').eq('id', CONFIG_ID).single()
            ]);

            if (profileRes.data) {
                // Safeguard nulls in DB with empty strings for controlled inputs
                const safeData: Record<string, string> = {};
                Object.keys(profileRes.data).forEach(key => {
                    safeData[key] = profileRes.data[key] || "";
                });
                setForm(prev => ({ ...prev, ...safeData }));

                if (profileRes.data.preferences) {
                    setPreferences(prev => ({ ...prev, ...profileRes.data.preferences }));
                }
                if (profileRes.data.avatar_url) {
                    setPreviewImage(profileRes.data.avatar_url);
                }
            }
            if (configRes.data?.relationshipStartDate) {
                setAnniversaryDate(configRes.data.relationshipStartDate);
            }
        } catch (err) {
            console.error("Fetch hatası:", err);
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("Dosya boyutu 10MB'dan küçük olmalıdır.");
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file: File) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('photos')
                .upload(fileName, file);

            if (!uploadError) {
                const { data: urlData } = supabase.storage
                    .from('photos')
                    .getPublicUrl(fileName);
                return urlData.publicUrl;
            }
            console.warn('Storage upload failed:', uploadError.message);
        } catch (err) {
            console.warn('Storage upload failed', err);
        }
        return previewImage || "";
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            let finalAvatarUrl = form.avatar_url;
            if (selectedFile) {
                finalAvatarUrl = await uploadImage(selectedFile);
            }

            const profileToSave = {
                ...form,
                id: PROFILE_ID,
                avatar_url: finalAvatarUrl,
                preferences
            };

            const { error: profileError } = await supabase.from('profile').upsert(profileToSave);

            // Upsert Config explicitly just in case row does not exist
            const { error: configError } = await supabase.from('config').upsert({ id: CONFIG_ID, relationshipStartDate: anniversaryDate });

            if (profileError || configError) {
                throw new Error(profileError?.message || configError?.message);
            }

            alert("Profil başarıyla güncellendi!");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            alert("Kaydetme hatası: " + errorMessage);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleToggle = (key: keyof AppProfilePreferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isMounted || loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Yükleniyor...</div>;

    const displayAvatar = previewImage || form.avatar_url || null;

    return (
        <div className="flex flex-col gap-6 pb-28">
            {/* Header / Avatar */}
            <Card className="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-primary-500 to-primary-700 text-white border-none shadow-lg shadow-primary-500/30">
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm shadow-inner cursor-pointer relative overflow-hidden group"
                >
                    {displayAvatar ? (
                        <img src={displayAvatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User size={48} className="text-white" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={24} className="text-white" />
                    </div>
                </div>
                <h2 className="text-2xl font-black tracking-tight">{form.name || "İsimsiz"}</h2>
                {form.bio && <p className="text-primary-100 mt-2 text-center px-4 text-sm max-w-xs">{form.bio}</p>}
            </Card>

            {/* Main Info */}
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-1">Temel Bilgiler</h3>
            <Card className="flex flex-col gap-4 p-5">
                <Input name="name" label="İsim" value={form.name} onChange={handleChange} />
                <div>
                    <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
                        <Heart size={16} className="text-primary" /> İlişki Başlangıç Tarihi
                    </label>
                    <input
                        type="date"
                        value={anniversaryDate}
                        onChange={(e) => setAnniversaryDate(e.target.value)}
                        className="w-full rounded-xl bg-gray-50 dark:bg-[#2C2C2E] border border-transparent focus:border-primary px-4 h-12 outline-none"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium mb-1.5">Biyografi (Bio)</label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-gray-50 dark:bg-[#2C2C2E] border border-transparent focus:border-primary focus:ring-1 focus:ring-primary p-4 transition-all text-base outline-none resize-y min-h-[80px]"
                        placeholder="Kendin hakkında kısa bir bilgi..."
                    />
                </div>
            </Card>

            {/* Preferences */}
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-1">Uygulama Tercihleri</h3>
            <Card className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Settings size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Etkinlikleri Göster</p>
                            <p className="text-xs text-gray-500">Ana sayfada yaklaşan etkinlikler görünsün</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleToggle('showEvents')}
                        className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${preferences.showEvents ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${preferences.showEvents ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Settings size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Anıları Göster</p>
                            <p className="text-xs text-gray-500">Anılar sekmesi ve ilgili alanlar aktif kalsın</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleToggle('showMemories')}
                        className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${preferences.showMemories ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${preferences.showMemories ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                </div>
            </Card>

            {/* Extra Info */}
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-1">Detaylı Bilgiler</h3>
            <Card className="flex flex-col gap-4 p-5">
                <div className="grid grid-cols-2 gap-4">
                    <Input name="ringSize" label="Yüzük Ölçüsü" value={form.ringSize} onChange={handleChange} />
                    <Input name="favoriteColor" label="Favori Renk" value={form.favoriteColor} onChange={handleChange} />
                </div>
                <Input name="coffeePreference" label="Kahve Tercihi" value={form.coffeePreference} onChange={handleChange} />
                <Input name="favoriteFood" label="En Sevdiği Yemek" value={form.favoriteFood} onChange={handleChange} />
                <div className="grid grid-cols-2 gap-4">
                    <Input name="favoritePolitician" label="En Sevdiği Siyasetçi" value={form.favoritePolitician} onChange={handleChange} />
                    <Input name="supportedParty" label="Tuttuğu Parti" value={form.supportedParty} onChange={handleChange} />
                </div>
                <Input name="favoriteYDCharacter" label="Favori YD Karakteri" value={form.favoriteYDCharacter} onChange={handleChange} />
                <Input name="favoriteTimePeriod" label="Favori Zaman Dilimi" value={form.favoriteTimePeriod} onChange={handleChange} />
                <Input name="firstDateLocation" label="İlk Date Konumu" value={form.firstDateLocation} onChange={handleChange} />

                <div className="w-full">
                    <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
                        <StickyNote size={16} /> Önemli Not
                    </label>
                    <textarea
                        name="importantNote"
                        value={form.importantNote}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-gray-50 dark:bg-[#2C2C2E] border border-transparent focus:border-primary focus:ring-1 focus:ring-primary p-4 transition-all text-base outline-none resize-y min-h-[80px]"
                    />
                </div>
            </Card>

            {/* Save Button (Fixed at Bottom) */}
            <div className="fixed bottom-[88px] left-4 right-4 max-w-md mx-auto z-10 pointer-events-none">
                <Button
                    onClick={handleSave}
                    className="w-full h-14 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 text-lg font-bold pointer-events-auto"
                    disabled={saving}
                >
                    <Save size={24} />
                    {saving ? "Kaydediliyor..." : "Profili Kaydet"}
                </Button>
            </div>
        </div>
    );
}
