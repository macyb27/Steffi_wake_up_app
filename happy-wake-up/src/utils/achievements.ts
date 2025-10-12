import { Achievement } from '../types';

export const achievements: Achievement[] = [
  // Wake Up Achievements
  {
    id: 'first-wake',
    name: 'Guten Morgen!',
    description: 'Dein erster Weckruf!',
    icon: '🌅',
    unlocked: false,
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Vor 6 Uhr aufgestanden',
    icon: '🐦',
    unlocked: false,
  },
  {
    id: 'perfect-week',
    name: 'Perfekte Woche',
    description: '7 Tage ohne Snooze',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: '30 Tage Streak erreicht',
    icon: '🔥',
    unlocked: false,
  },
  
  // Monster Achievements
  {
    id: 'monster-collector',
    name: 'Monster Sammler',
    description: '5 Monster freigeschaltet',
    icon: '🎭',
    unlocked: false,
  },
  {
    id: 'legendary-friend',
    name: 'Legendärer Freund',
    description: 'Ein legendäres Monster freigeschaltet',
    icon: '⭐',
    unlocked: false,
  },
  
  // Game Achievements
  {
    id: 'game-master',
    name: 'Spiele Meister',
    description: '50 Mini-Spiele gewonnen',
    icon: '🎮',
    unlocked: false,
  },
  {
    id: 'speed-demon',
    name: 'Blitzschnell',
    description: 'Mini-Spiel in unter 10 Sekunden',
    icon: '⚡',
    unlocked: false,
  },
  
  // Special Achievements
  {
    id: 'happiness-overflow',
    name: 'Glücks Überlauf',
    description: '10.000 Happiness Points',
    icon: '💖',
    unlocked: false,
  },
  {
    id: 'easter-hunter',
    name: 'Easter Egg Jäger',
    description: 'Alle Easter Eggs gefunden',
    icon: '🥚',
    unlocked: false,
  },
];

export const checkAchievements = (stats: any): Achievement[] => {
  const newAchievements: Achievement[] = [];
  
  // Check various achievement conditions
  if (stats.totalWakeUps === 1) {
    const achievement = achievements.find(a => a.id === 'first-wake');
    if (achievement && !achievement.unlocked) {
      newAchievements.push({ ...achievement, unlocked: true, unlockedAt: new Date() });
    }
  }
  
  if (stats.currentStreak >= 7) {
    const achievement = achievements.find(a => a.id === 'perfect-week');
    if (achievement && !achievement.unlocked) {
      newAchievements.push({ ...achievement, unlocked: true, unlockedAt: new Date() });
    }
  }
  
  if (stats.currentStreak >= 30) {
    const achievement = achievements.find(a => a.id === 'streak-master');
    if (achievement && !achievement.unlocked) {
      newAchievements.push({ ...achievement, unlocked: true, unlockedAt: new Date() });
    }
  }
  
  if (stats.happinessPoints >= 10000) {
    const achievement = achievements.find(a => a.id === 'happiness-overflow');
    if (achievement && !achievement.unlocked) {
      newAchievements.push({ ...achievement, unlocked: true, unlockedAt: new Date() });
    }
  }
  
  return newAchievements;
};