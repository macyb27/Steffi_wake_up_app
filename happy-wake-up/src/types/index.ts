export interface Alarm {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
  repeat: DayOfWeek[];
  soundId: string;
  monsterId: string;
  miniGameRequired: boolean;
  snoozeCount: number;
}

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export interface Monster {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  happinessBoost: number;
  message: string;
}

export interface UserStats {
  totalWakeUps: number;
  perfectWakeUps: number;
  currentStreak: number;
  longestStreak: number;
  happinessPoints: number;
  unlockedMonsters: string[];
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface MiniGame {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'math' | 'memory' | 'reaction' | 'puzzle';
}

export interface Sound {
  id: string;
  name: string;
  category: 'gentle' | 'energetic' | 'nature' | 'cute';
  file: string;
}