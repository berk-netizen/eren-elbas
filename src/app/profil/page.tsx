"use client";

import { useState } from 'react';
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { initialProfile } from "@/lib/dummyData";
import { AppProfile } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Gem, Coffee, Palette, Edit2, Utensils, Landmark, Flag, Tv, Clock, MapPin, StickyNote } from "lucide-react";

export default function ProfilePage() {
    const [profile, setProfile, isLoaded] = useLocalStorageState<AppProfile>("eren_profile", initialProfile);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setProfile({
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
        });
        setIsEditOpen(false);
    };

    const safeProfile = profile || initialProfile;

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 animate-pulse">Yükleniyor...</div>;

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
                    <p className="font-bold text-sm sm:text-base">{safeProfile.ringSize}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Coffee size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Kahve Tercihi</p>
                    <p className="font-bold text-sm sm:text-base">{safeProfile.coffeePreference}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Palette size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Favori Renk</p>
                    <p className="font-bold text-sm sm:text-base">{safeProfile.favoriteColor}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Utensils size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">En Sevdiği Yemek</p>
                    <p className="font-bold text-sm sm:text-base">{safeProfile.favoriteFood}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Landmark size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">En Sevdiği Siyasetçi</p>
                    <p className="font-bold text-sm sm:text-base">{safeProfile.favoritePolitician}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Flag size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Tuttuğu Parti</p>
                    <p className="font-bold text-sm sm:text-base">{safeProfile.supportedParty}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Tv size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Favori YD Karakteri</p>
                    <p className="font-bold text-sm sm:text-base">{safeProfile.favoriteYDCharacter}</p>
                </Card>

                <Card className="flex flex-col p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><Clock size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Favori Zaman Dilimi</p>
                    <p className="font-bold text-sm sm:text-base">{safeProfile.favoriteTimePeriod}</p>
                </Card>

                <Card className="flex flex-col p-4 col-span-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><MapPin size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">İlk Date Konumu</p>
                    <p className="font-bold text-sm sm:text-base">{safeProfile.firstDateLocation}</p>
                </Card>

                <Card className="flex flex-col p-4 col-span-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group" onClick={() => setIsEditOpen(true)}>
                    <div className="text-primary mb-2"><StickyNote size={24} /></div>
                    <p className="text-xs text-gray-500 mb-1">Önemli Not</p>
                    <p className="font-bold text-sm sm:text-base whitespace-pre-wrap">{safeProfile.importantNote}</p>
                </Card>
            </div>

            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Profili Düzenle">
                <form onSubmit={handleSave} className="flex flex-col gap-4 mt-2">
                    <Input name="name" label="İsim Soyisim" defaultValue={safeProfile.name} required />
                    <Input name="ringSize" label="Yüzük Ölçüsü" defaultValue={safeProfile.ringSize} />
                    <Input name="coffeePreference" label="Kahve Tercihi" defaultValue={safeProfile.coffeePreference} />
                    <Input name="favoriteColor" label="Favori Renk" defaultValue={safeProfile.favoriteColor} />
                    <Input name="favoriteFood" label="En Sevdiği Yemek" defaultValue={safeProfile.favoriteFood} required />
                    <Input name="favoritePolitician" label="En Sevdiği Siyasetçi" defaultValue={safeProfile.favoritePolitician} />
                    <Input name="supportedParty" label="Tuttuğu Parti" defaultValue={safeProfile.supportedParty} />
                    <Input name="favoriteYDCharacter" label="Favori Yaprak Dökümü Karakteri" defaultValue={safeProfile.favoriteYDCharacter} />
                    <Input name="favoriteTimePeriod" label="En Sevdiği Zaman Dilimi" defaultValue={safeProfile.favoriteTimePeriod} />
                    <Input name="firstDateLocation" label="İlk Date Konumu" defaultValue={safeProfile.firstDateLocation} />

                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1.5">Önemli Not</label>
                        <textarea
                            name="importantNote"
                            defaultValue={safeProfile.importantNote}
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
