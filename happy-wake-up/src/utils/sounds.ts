import { Sound } from '../types';
import { Howl } from 'howler';

export const sounds: Sound[] = [
  // Gentle Sounds
  {
    id: 'birds',
    name: 'Vögel Gezwitscher',
    category: 'gentle',
    file: 'birds.mp3',
  },
  {
    id: 'harp',
    name: 'Harfen Melodie',
    category: 'gentle',
    file: 'harp.mp3',
  },
  {
    id: 'windchimes',
    name: 'Windspiel',
    category: 'gentle',
    file: 'windchimes.mp3',
  },
  
  // Energetic Sounds
  {
    id: 'happy-tune',
    name: 'Happy Tune',
    category: 'energetic',
    file: 'happy.mp3',
  },
  {
    id: 'ukulele',
    name: 'Ukulele Vibes',
    category: 'energetic',
    file: 'ukulele.mp3',
  },
  
  // Nature Sounds
  {
    id: 'ocean',
    name: 'Ozean Wellen',
    category: 'nature',
    file: 'ocean.mp3',
  },
  {
    id: 'rain',
    name: 'Sanfter Regen',
    category: 'nature',
    file: 'rain.mp3',
  },
  
  // Cute Sounds
  {
    id: 'bells',
    name: 'Glöckchen',
    category: 'cute',
    file: 'bells.mp3',
  },
  {
    id: 'music-box',
    name: 'Spieluhr',
    category: 'cute',
    file: 'musicbox.mp3',
  },
];

// Sound Manager
class SoundManager {
  private currentSound: Howl | null = null;
  private volumeFadeInterval: NodeJS.Timeout | null = null;

  playSound(soundId: string, volume: number = 0.5): void {
    this.stopSound();
    
    const sound = sounds.find(s => s.id === soundId);
    if (!sound) return;
    
    // For now, we'll use placeholder sounds
    // In production, you'd load actual sound files
    this.currentSound = new Howl({
      src: [`/sounds/${sound.file}`],
      volume: 0,
      loop: true,
    });
    
    // Fade in effect
    this.currentSound.play();
    this.fadeIn(volume);
  }
  
  fadeIn(targetVolume: number): void {
    if (!this.currentSound) return;
    
    let currentVolume = 0;
    const step = targetVolume / 20; // 20 steps
    
    this.volumeFadeInterval = setInterval(() => {
      if (!this.currentSound) return;
      
      currentVolume += step;
      if (currentVolume >= targetVolume) {
        currentVolume = targetVolume;
        if (this.volumeFadeInterval) {
          clearInterval(this.volumeFadeInterval);
        }
      }
      this.currentSound.volume(currentVolume);
    }, 100);
  }
  
  stopSound(): void {
    if (this.volumeFadeInterval) {
      clearInterval(this.volumeFadeInterval);
    }
    
    if (this.currentSound) {
      this.currentSound.stop();
      this.currentSound = null;
    }
  }
  
  snooze(): void {
    if (this.currentSound) {
      this.currentSound.volume(0.2);
    }
  }
}

export const soundManager = new SoundManager();