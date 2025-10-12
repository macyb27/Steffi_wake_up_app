export interface LoveMessage {
  id: string;
  text: string;
  emoji?: string;
  special?: boolean;
}

export const loveMessages: LoveMessage[] = [
  {
    id: 'princess',
    text: '{name} is Princess of the day',
    emoji: '👑',
    special: true,
  },
  {
    id: 'beauty',
    text: 'Keine(r) sieht besser aus als du, darling!',
    emoji: '💕',
  },
  {
    id: 'marc',
    text: 'Marc ist der Beste, ruf ihn mal an',
    emoji: '📱',
    special: true,
  },
  {
    id: 'smell',
    text: 'Du riechst so gut',
    emoji: '🌸',
  },
  {
    id: 'skin',
    text: 'Deine Haut ist wie die einer 18-jährigen',
    emoji: '✨',
  },
  {
    id: 'model',
    text: 'Du solltest modeln, mit deinem Aussehen!',
    emoji: '📸',
  },
  {
    id: 'angel',
    text: 'Warum schlafen Engel eigentlich? Weil du es so magst?',
    emoji: '😇',
    special: true,
  },
  {
    id: 'coming',
    text: 'Bleib liegen, ich komme zu dir',
    emoji: '💖',
  },
  {
    id: 'luder',
    text: 'Aufstehen, du Luder:)',
    emoji: '😈',
    special: true,
  },
];

export const getRandomLoveMessage = (): LoveMessage => {
  const randomIndex = Math.floor(Math.random() * loveMessages.length);
  return loveMessages[randomIndex];
};

export const personalizeMessage = (message: string, name: string): string => {
  return message.replace('{name}', name);
};

export const getSpecialMessages = (): LoveMessage[] => {
  return loveMessages.filter(msg => msg.special);
};

// Zusätzliche süße Nachrichten für zwischendurch
export const bonusMessages = [
  'Du bist mein Sonnenschein ☀️',
  'Ich liebe dein Lächeln 😊',
  'Du machst jeden Tag besonders 🌟',
  'Mit dir ist alles schöner 🌈',
  'Du bist perfekt, so wie du bist 💫',
  'Deine Augen funkeln wie Sterne ⭐',
  'Du bist mein größtes Glück 🍀',
  'Ich bin so stolz auf dich 🎯',
  'Du verzauberst mich jeden Tag 🪄',
  'Forever and always 💍',
];