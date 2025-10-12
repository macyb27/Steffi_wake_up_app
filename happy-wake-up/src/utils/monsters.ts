import { Monster } from '../types';

export const monsters: Monster[] = [
  // Common Monsters
  {
    id: 'sunny',
    name: 'Sunny',
    emoji: '🌟',
    unlocked: true,
    rarity: 'common',
    happinessBoost: 10,
    message: 'Guten Morgen, Sonnenschein! Zeit, die Welt zu erobern! ☀️',
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    emoji: '🫧',
    unlocked: true,
    rarity: 'common',
    happinessBoost: 10,
    message: 'Blubb blubb! Lass uns zusammen in den Tag schweben! 💕',
  },
  {
    id: 'sparkle',
    name: 'Sparkle',
    emoji: '✨',
    unlocked: false,
    rarity: 'common',
    happinessBoost: 15,
    message: 'Funkel funkel! Du bist heute besonders strahlend! ✨',
  },
  {
    id: 'pinky',
    name: 'Pinky',
    emoji: '🦄',
    unlocked: false,
    rarity: 'common',
    happinessBoost: 15,
    message: 'Einhorn-Power aktiviert! Heute wird magisch! 🌈',
  },
  
  // Rare Monsters
  {
    id: 'luna',
    name: 'Luna',
    emoji: '🌙',
    unlocked: false,
    rarity: 'rare',
    happinessBoost: 25,
    message: 'Der Mond verabschiedet sich, aber ich bleibe bei dir! 🌟',
  },
  {
    id: 'cherry',
    name: 'Cherry',
    emoji: '🍒',
    unlocked: false,
    rarity: 'rare',
    happinessBoost: 25,
    message: 'Life is like a cherry - süß und voller Überraschungen! 🎀',
  },
  {
    id: 'cloudy',
    name: 'Cloudy',
    emoji: '☁️',
    unlocked: false,
    rarity: 'rare',
    happinessBoost: 30,
    message: 'Auf Wolke 7 in den Tag starten! Flieg mit mir! ☁️',
  },
  
  // Epic Monsters
  {
    id: 'galaxy',
    name: 'Galaxy',
    emoji: '🌌',
    unlocked: false,
    rarity: 'epic',
    happinessBoost: 40,
    message: 'Du bist mein Universum! Lass uns Sterne sammeln! ⭐',
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    emoji: '🌈',
    unlocked: false,
    rarity: 'epic',
    happinessBoost: 45,
    message: 'Nach dem Regen kommt der Regenbogen - und du bist mein Schatz am Ende! 💎',
  },
  {
    id: 'crystal',
    name: 'Crystal',
    emoji: '💎',
    unlocked: false,
    rarity: 'epic',
    happinessBoost: 50,
    message: 'Du bist wertvoller als alle Diamanten dieser Welt! 💖',
  },
  
  // Legendary Monsters
  {
    id: 'phoenix',
    name: 'Phoenix',
    emoji: '🔥',
    unlocked: false,
    rarity: 'legendary',
    happinessBoost: 75,
    message: 'Erhebe dich wie ein Phoenix! Heute ist DEIN Tag! 🔥',
  },
  {
    id: 'cosmic',
    name: 'Cosmic',
    emoji: '🪐',
    unlocked: false,
    rarity: 'legendary',
    happinessBoost: 100,
    message: 'Die Planeten haben sich für dich ausgerichtet! Kosmische Energie fließt! 🌟',
  },
];

export const getMonsterById = (id: string): Monster | undefined => {
  return monsters.find(m => m.id === id);
};

export const getUnlockedMonsters = (unlockedIds: string[]): Monster[] => {
  return monsters.filter(m => unlockedIds.includes(m.id));
};

export const getRandomMessage = (): string => {
  const messages = [
    'Du schaffst das! 💪',
    'Heute wird wundervoll! 🌸',
    'Lächeln nicht vergessen! 😊',
    'Du bist amazing! ✨',
    'Shine bright like a diamond! 💎',
    'Good vibes only! 🌈',
    'Du rockst! 🎸',
    'Believe in yourself! 🌟',
    'Du bist ein Geschenk! 🎁',
    'Träume werden wahr! 💫',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};