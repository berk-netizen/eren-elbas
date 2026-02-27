"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { AppProfile } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Gem, Coffee, Palette, Edit2, Utensils, Landmark, Flag, Tv, Clock, MapPin, StickyNote } from "lucide-react";

const PROFILE_ID = '00000000-0000-0000-0000-000000000000';

export default function ProfilePage() {
    const [profile, setProfile] = useState<AppProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        async function fetchProfile() {
            try {
                const { data, error } = await supabase
                    .from('profile')
                    .select('*')
                    .eq('id', PROFILE_ID)
                    .single();

                if (data && !error) {
                    setProfile(data);
                } else {
                    console.warn("Profil bulunamadı veya tablo yok, varsayılan yükleniyor.");
                    setProfile(null);
                }
            } catch (err) {
                console.error("Fetch hatası:", err);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newProfile = {
            id: PROFILE_ID,
            name: formData.get('name') as string,
            ringSize: formData.get('ringSize') as string,
            coffeePreference: formData.get('coffeePreference') as string,
            favoriteColor: formData.get('favoriteColor') as string,
            favoriteFood: formData.get('favoriteFood') as string,
            favoritePolitician: formData.get('favoritePolitician') as string,
            supportedParty: formData.get('supportedParty') as string,
            favoriteYDCharacter: formData.get('favoriteYDCharacter') as string,
            favoriteTimePeriod: formData.get('favoriteTimePeriod') as string,
            firstDateLocation: formData.get('firstDateLocation') as string,
            importantNote: formData.get('importantNote') as string,
        };

        const { error } = await supabase
            .from('profile')
            .upsert(newProfile);

        if (!error) {
            setProfile(prev => prev ? { ...prev, ...newProfile } : newProfile as AppProfile);
            setIsEditOpen(false);
        } else {
            console.error("Profil güncellenirken hata:", error);
            alert("Profil güncellenirken bir hata oluştu.");
        }
    };

    if (!isMounted || loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Yükleniyor...</div>;

    const safeProfile = profile || {
        name: "İsim Soyisim",
        ringSize: "-",
        coffeePreference: "-",
        favoriteColor: "-",
        favoriteFood: "-",
        favoritePolitician: "-",
        supportedParty: "-",
        favoriteYDCharacter: "-",
        favoriteTimePeriod: "-",
        firstDateLocation: "-",
        importantNote: "-"
    } as AppProfile;

    // Strict optional chaining to absolutely prevent "Cannot read properties of null"
    const displayName = safeProfile?.name || "İsim Soyisim";
    const displayRingSize = safeProfile?.ringSize || "-";
    const displayCoffee = safeProfile?.coffeePreference || "-";
    const displayColor = safeProfile?.favoriteColor || "-";
    const displayFood = safeProfile?.favoriteFood || "-";
    const displayPolitician = safeProfile?.favoritePolitician || "-";
    const displayParty = safeProfile?.supportedParty || "-";
    const displayCharacter = safeProfile?.favoriteYDCharacter || "-";
    const displayTimePeriod = safeProfile?.favoriteTimePeriod || "-";
    const displayLocation = safeProfile?.firstDateLocation || "-";
    const displayNote = safeProfile?.importantNote || "-";

    return (
        <div className="flex flex-col gap-6">
            <Card className="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-primary-500 to-primary-700 text-white border-none shadow-lg shadow-primary-500/30">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm shadow-inner">
                    <User size={48} className="text-white" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">{safeProfile.name}</h2>
                <Button
                    variant="ghost"
                    className="mt-4 text-white hover:bg-white/20 h-9 px-4 rounded-full"
                    onClick={() => setIsEditOpen(true)}
                >
                    <Edit2 size={16} className="mr-2" />
                    Düzenle
                </Button>
            </Card>

            <div className="grid grid-cols-2 gap-4 pb-6">
                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Gem size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Yüzük Ölçüsü</p>
                    <p className="font-bold text-sm sm:text-base">{displayRingSize}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Coffee size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Kahve Tercihi</p>
                    <p className="font-bold text-sm sm:text-base">{displayCoffee}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Palette size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Favori Renk</p>
                    <p className="font-bold text-sm sm:text-base">{displayColor}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Utensils size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">En Sevdiği Yemek</p>
                    <p className="font-bold text-sm sm:text-base">{displayFood}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Landmark size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">En Sevdiği Siyasetçi</p>
                    <p className="font-bold text-sm sm:text-base">{displayPolitician}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Flag size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Tuttuğu Parti</p>
                    <p className="font-bold text-sm sm:text-base">{displayParty}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Tv size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Favori YD Karakteri</p>
                    <p className="font-bold text-sm sm:text-base">{displayCharacter}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Clock size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Favori Zaman Dilimi</p>
                    <p className="font-bold text-sm sm:text-base">{displayTimePeriod}</p>
                </Card>

                <Card className="flex flex-col p-4 col-span-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><MapPin size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">İlk Date Konumu</p>
                    <p className="font-bold text-sm sm:text-base">{displayLocation}</p>
                </Card>

                <Card className="flex flex-col p-4 col-span-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><StickyNote size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Önemli Not</p>
                    <p className="font-bold text-sm sm:text-base whitespace-pre-wrap">{displayNote}</p>
                </Card>
            </div>

            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Profili Düzenle">
                <form onSubmit={handleSave} className="flex flex-col gap-4 mt-2">
                    <Input name="name" label="İsim Soyisim" defaultValue={displayName} required />
                    <Input name="ringSize" label="Yüzük Ölçüsü" defaultValue={displayRingSize} />
                    <Input name="coffeePreference" label="Kahve Tercihi" defaultValue={displayCoffee} />
                    <Input name="favoriteColor" label="Favori Renk" defaultValue={displayColor} />
                    <Input name="favoriteFood" label="En Sevdiği Yemek" defaultValue={displayFood} required />
                    <Input name="favoritePolitician" label="En Sevdiği Siyasetçi" defaultValue={displayPolitician} />
                    <Input name="supportedParty" label="Tuttuğu Parti" defaultValue={displayParty} />
                    <Input name="favoriteYDCharacter" label="Favori Yaprak Dökümü Karakteri" defaultValue={displayCharacter} />
                    <Input name="favoriteTimePeriod" label="En Sevdiği Zaman Dilimi" defaultValue={displayTimePeriod} />
                    <Input name="firstDateLocation" label="İlk Date Konumu" defaultValue={displayLocation} />

                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1.5">Önemli Not</label>
                        <textarea
                            name="importantNote"
                            defaultValue={displayNote}
                            className="w-full rounded-xl bg-gray-50 dark:bg-[#2C2C2E] border border-transparent focus:border-primary focus:ring-1 focus:ring-primary p-4 transition-all text-base outline-none resize-y min-h-[80px]"
                        />
                    </div>

                    <div className="pt-4 pb-10">
                        <Button type="submit" className="w-full">Kaydet</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
