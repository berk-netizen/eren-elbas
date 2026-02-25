export interface AppConfig {
    relationshipStartDate: string;
}

export interface AppEvent {
    id: string;
    title: string;
    dateISO: string;
    iconType: string;
}

export interface AppMemory {
    id: string;
    title: string;
    description: string;
    dateISO: string;
    image: string; // Base64
}

export interface AppProfile {
    name: string;
    ringSize: string;
    coffeePreference: string;
    favoriteColor: string;
    favoriteFood: string;
    favoritePolitician: string;
    supportedParty: string;
    favoriteYDCharacter: string;
    favoriteTimePeriod: string;
    firstDateLocation: string;
    importantNote: string;
}
