export interface HomunculusData {
  emoji: string;
  description: string;
  cost: Record<string, number>;
  baseEfficiency: number;
  specialization: string[];
}

export const HOMUNCULI: Record<string, HomunculusData> = {
  apprentice: {
    emoji: '🧙‍♂️',
    description: 'A basic assistant for element gathering',
    cost: {
      fire: 10,
      water: 10,
      earth: 10,
      air: 10,
    },
    baseEfficiency: 100,
    specialization: ['fire', 'water', 'earth', 'air'],
  },
  elemental: {
    emoji: '🌟',
    description: 'Specialized in elemental manipulation',
    cost: {
      fire: 25,
      water: 25,
      lightning: 5,
    },
    baseEfficiency: 150,
    specialization: ['fire', 'water', 'air'],
  },
  golem: {
    emoji: '🗿',
    description: 'Strong earth-based worker',
    cost: {
      earth: 50,
      metal: 10,
    },
    baseEfficiency: 200,
    specialization: ['earth'],
  },
};