export interface ElementData {
  emoji: string;
  tier: number;
  category: string;
  formula?: string;
}

export interface CompoundData {
  emoji: string;
  tier: number;
  category: string;
  recipe: string[];
  formula?: string;
}

export const ELEMENTS: Record<string, ElementData> = {
  fire: {
    emoji: '🔥',
    tier: 1,
    category: 'basic',
  },
  water: {
    emoji: '💧',
    tier: 1,
    category: 'basic',
  },
  earth: {
    emoji: '🌍',
    tier: 1,
    category: 'basic',
  },
  air: {
    emoji: '💨',
    tier: 1,
    category: 'basic',
  },
  energy: {
    emoji: '⚡',
    tier: 2,
    category: 'advanced',
  },
  life: {
    emoji: '🌱',
    tier: 2,
    category: 'advanced',
  },
  metal: {
    emoji: '⚙️',
    tier: 2,
    category: 'advanced',
  },
  crystal: {
    emoji: '💎',
    tier: 2,
    category: 'advanced',
  },
};

export const COMPOUNDS: Record<string, CompoundData> = {
  steam: {
    emoji: '💨',
    tier: 2,
    category: 'basic_compounds',
    recipe: ['fire', 'water'],
    formula: 'Fire + Water',
  },
  mud: {
    emoji: '🟤',
    tier: 2,
    category: 'basic_compounds',
    recipe: ['earth', 'water'],
    formula: 'Earth + Water',
  },
  dust: {
    emoji: '🌪️',
    tier: 2,
    category: 'basic_compounds',
    recipe: ['earth', 'air'],
    formula: 'Earth + Air',
  },
  lava: {
    emoji: '🌋',
    tier: 2,
    category: 'basic_compounds',
    recipe: ['fire', 'earth'],
    formula: 'Fire + Earth',
  },
  lightning: {
    emoji: '⚡',
    tier: 3,
    category: 'advanced_compounds',
    recipe: ['fire', 'air'],
    formula: 'Fire + Air',
  },
  ice: {
    emoji: '🧊',
    tier: 2,
    category: 'basic_compounds',
    recipe: ['water', 'air'],
    formula: 'Water + Air',
  },
  plant: {
    emoji: '🌿',
    tier: 3,
    category: 'life_compounds',
    recipe: ['earth', 'water', 'air'],
    formula: 'Earth + Water + Air',
  },
  metal: {
    emoji: '⚙️',
    tier: 3,
    category: 'advanced_compounds',
    recipe: ['fire', 'earth', 'air'],
    formula: 'Fire + Earth + Air',
  },
  glass: {
    emoji: '🪟',
    tier: 3,
    category: 'advanced_compounds',
    recipe: ['fire', 'earth'],
    formula: 'Fire + Earth',
  },
  cloud: {
    emoji: '☁️',
    tier: 2,
    category: 'weather_compounds',
    recipe: ['air', 'water'],
    formula: 'Air + Water',
  },
};