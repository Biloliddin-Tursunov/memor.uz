export enum AppStep {
  LANDING = 'LANDING',
  INTRO = 'INTRO',
  CHAT = 'CHAT',
  STAGE_SELECT = 'STAGE_SELECT',
  LOCATION_SELECT = 'LOCATION_SELECT',
  STYLE_SELECT = 'STYLE_SELECT',
  REQUIREMENTS = 'REQUIREMENTS',
  DESIGN_PROPOSALS = 'DESIGN_PROPOSALS',
  PLAN_PROPOSALS = 'PLAN_PROPOSALS'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface HouseSpecs {
  rooms: string;
  floors: string;
  price: string;
  extra: string;
}