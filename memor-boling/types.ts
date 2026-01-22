export enum AppStep {
    LANDING = "LANDING",
    INTRO = "INTRO",
    CHAT = "CHAT",
    STAGE_SELECT = "STAGE_SELECT",
    LOCATION_SELECT = "LOCATION_SELECT", // Only for 'land'
    DETAILS_INPUT = "DETAILS_INPUT", // For 'house' (renovation) and 'interior'
    STYLE_SELECT = "STYLE_SELECT",
    REQUIREMENTS = "REQUIREMENTS",
    DESIGN_PROPOSALS = "DESIGN_PROPOSALS",
    PLAN_PROPOSALS = "PLAN_PROPOSALS",
}

export type ProjectType = "land" | "house" | "interior" | "idea" | null;

export interface ChatMessage {
    id: string;
    role: "user" | "model";
    text: string;
}

export interface HouseSpecs {
    rooms: string;
    floors: string;
    price: string;
    extra: string;
    area?: string; // Square meters
}
