
export enum GrowthStage {
  GERMINATION = 'Germinación',
  SEEDLING = 'Plántula',
  VEGETATIVE = 'Vegetativo',
  PRE_FLOWER = 'Pre-floración',
  FLOWERING = 'Floración',
  RIPENING = 'Maduración',
  FLUSH = 'Lavado'
}

export interface Plant {
  id: string;
  name: string;
  strain: string;
  startDate: string;
  stage: GrowthStage;
  isAuto: boolean;
  notes?: string;
  imageUrl?: string;
}

export interface DailyTask {
  id: string;
  plantId: string;
  date: string;
  type: 'watering' | 'fertilizing' | 'pruning' | 'check';
  description: string;
  isCompleted: boolean;
  nutrients?: NutrientDose[];
}

export interface NutrientDose {
  name: string;
  amount: number; // ml per liter
}

export interface GrowthLog {
  id: string;
  plantId: string;
  date: string;
  height: number;
  ph: number;
  ec: number;
  notes: string;
  photoUrl?: string;
}

export type View = 'dashboard' | 'calendar' | 'logs' | 'guide' | 'community' | 'ai-expert';
