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
  color: string;
  flowerEmoji?: string;
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
    color: '#E5E7EB',
    flowerEmoji: '🌸',
  },
  mud: {
    emoji: '🟤',
    tier: 2,
    category: 'basic_compounds',
    recipe: ['earth', 'water'],
    formula: 'Earth + Water',
    color: '#8B4513',
    flowerEmoji: '🌻',
  },
  dust: {
    emoji: '🌪️',
    tier: 2,
    category: 'basic_compounds',
    recipe: ['earth', 'air'],
    formula: 'Earth + Air',
    color: '#D2B48C',
    flowerEmoji: '🌼',
  },
  lava: {
    emoji: '🌋',
    tier: 2,
    category: 'basic_compounds',
    recipe: ['fire', 'earth'],
    formula: 'Fire + Earth',
    color: '#FF4500',
    flowerEmoji: '🌺',
  },
  lightning: {
    emoji: '⚡',
    tier: 3,
    category: 'advanced_compounds',
    recipe: ['fire', 'air'],
    formula: 'Fire + Air',
    color: '#FFD700',
    flowerEmoji: '⚡',
  },
  ice: {
    emoji: '🧊',
    tier: 2,
    category: 'basic_compounds',
    recipe: ['water', 'air'],
    formula: 'Water + Air',
    color: '#87CEEB',
    flowerEmoji: '❄️',
  },
  plant: {
    emoji: '🌿',
    tier: 3,
    category: 'life_compounds',
    recipe: ['earth', 'water', 'air'],
    formula: 'Earth + Water + Air',
    color: '#228B22',
    flowerEmoji: '🌿',
  },
  metal: {
    emoji: '⚙️',
    tier: 3,
    category: 'advanced_compounds',
    recipe: ['fire', 'earth', 'air'],
    formula: 'Fire + Earth + Air',
    color: '#C0C0C0',
    flowerEmoji: '⚙️',
  },
  glass: {
    emoji: '🪟',
    tier: 3,
    category: 'advanced_compounds',
    recipe: ['fire', 'earth'],
    formula: 'Fire + Earth',
    color: '#F0F8FF',
    flowerEmoji: '💎',
  },
  cloud: {
    emoji: '☁️',
    tier: 2,
    category: 'weather_compounds',
    recipe: ['air', 'water'],
    formula: 'Air + Water',
    color: '#F5F5F5',
    flowerEmoji: '☁️',
  },
};