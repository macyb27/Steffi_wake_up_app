import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
// Remove react-icons import for now
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { Clock } from './components/Clock';
import { Button } from './components/Button';
import { AlarmCard } from './components/AlarmCard';
import { MonsterDisplay } from './components/MonsterDisplay';
import { MathGame } from './components/MiniGames/MathGame';
import { Alarm, UserStats } from './types';
import { monsters, getMonsterById } from './utils/monsters';
import { soundManager } from './utils/sounds';
import confetti from 'canvas-confetti';
import { EasterEggs } from './components/EasterEggs';
import { MotivationPopup } from './components/MotivationPopup';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 16, 240, 0.1) 0%, transparent 70%);
    animation: rotate 30s linear infinite;
    pointer-events: none;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  background: ${theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(${theme.shadows.large});
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${theme.colors.textSecondary};
  margin: 8px 0 0 0;
`;

const Content = styled.main`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Stats = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.large};
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-around;
  border: 1px solid ${theme.colors.primary};
  box-shadow: ${theme.shadows.medium};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-family: ${theme.fonts.display};
  font-size: 28px;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

const FloatingAction = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: ${theme.shadows.large};
`;

const AlarmScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.background};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const AlarmTitle = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 64px;
  margin: 24px 0;
  text-align: center;
  background: ${theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

function App() {
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: '1',
      time: '07:00',
      label: 'Guten Morgen, Sonnenschein! ☀️',
      enabled: true,
      repeat: [1, 2, 3, 4, 5],
      soundId: 'birds',
      monsterId: 'sunny',
      miniGameRequired: true,
      snoozeCount: 0,
    },
  ]);
  
  const [userStats, setUserStats] = useState<UserStats>({
    totalWakeUps: 42,
    perfectWakeUps: 35,
    currentStreak: 7,
    longestStreak: 14,
    happinessPoints: 1250,
    unlockedMonsters: ['sunny', 'bubbles', 'sparkle', 'luna'],
    achievements: [],
  });
  
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Check for alarms
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const currentDay = now.getDay();
      
      alarms.forEach(alarm => {
        if (alarm.enabled && 
            alarm.time === currentTimeStr && 
            alarm.repeat.includes(currentDay) &&
            !activeAlarm) {
          triggerAlarm(alarm);
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [alarms, activeAlarm]);
  
  const triggerAlarm = (alarm: Alarm) => {
    setActiveAlarm(alarm);
    soundManager.playSound(alarm.soundId, 0.7);
    
    // Vibrate if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  };
  
  const handleSnooze = () => {
    if (activeAlarm) {
      soundManager.snooze();
      const updatedAlarm = { ...activeAlarm, snoozeCount: activeAlarm.snoozeCount + 1 };
      setActiveAlarm(null);
      
      // Set snooze for 5 minutes
      setTimeout(() => {
        triggerAlarm(updatedAlarm);
      }, 5 * 60 * 1000);
    }
  };
  
  const handleDismiss = () => {
    if (activeAlarm) {
      if (activeAlarm.miniGameRequired) {
        setShowMiniGame(true);
      } else {
        completeWakeUp(true);
      }
    }
  };
  
  const handleMiniGameComplete = (success: boolean) => {
    if (success) {
      completeWakeUp(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF10F0', '#FF6EC7', '#00FFFF'],
      });
    } else {
      setShowMiniGame(false);
    }
  };
  
  const completeWakeUp = (perfect: boolean) => {
    soundManager.stopSound();
    setActiveAlarm(null);
    setShowMiniGame(false);
    
    // Update stats
    setUserStats(prev => ({
      ...prev,
      totalWakeUps: prev.totalWakeUps + 1,
      perfectWakeUps: perfect ? prev.perfectWakeUps + 1 : prev.perfectWakeUps,
      currentStreak: perfect ? prev.currentStreak + 1 : 0,
      happinessPoints: prev.happinessPoints + (perfect ? 50 : 10),
    }));
  };
  
  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };
  
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <Title className="neon-text">Happy Wake Up! 🌈</Title>
          <Subtitle>Wach auf mit einem Lächeln ✨</Subtitle>
        </Header>
        
        <Content>
          <Clock />
          
          <Stats
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatItem>
              <StatValue>{userStats.currentStreak}</StatValue>
              <StatLabel>Streak 🔥</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{userStats.happinessPoints}</StatValue>
              <StatLabel>Happy Points 💖</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{userStats.unlockedMonsters.length}</StatValue>
              <StatLabel>Monster 🎭</StatLabel>
            </StatItem>
          </Stats>
          
          {alarms.map((alarm, index) => (
            <motion.div
              key={alarm.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <AlarmCard
                alarm={alarm}
                onToggle={toggleAlarm}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </motion.div>
          ))}
        </Content>
        
        <FloatingAction variant="primary" glow>
          +
        </FloatingAction>
        
        <EasterEggs />
        <MotivationPopup />
        
        <AnimatePresence>
          {activeAlarm && !showMiniGame && (
            <AlarmScreen
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <MonsterDisplay
                monster={getMonsterById(activeAlarm.monsterId) || monsters[0]}
                size="large"
                animated
                showMessage
              />
              
              <AlarmTitle>
                {activeAlarm.label || 'Zeit aufzustehen!'}
              </AlarmTitle>
              
              <ButtonGroup>
                <Button
                  size="large"
                  variant="glass"
                  onClick={handleSnooze}
                >
                  Snooze (5 min) 😴
                </Button>
                
                <Button
                  size="large"
                  variant="primary"
                  onClick={handleDismiss}
                  glow
                >
                  Aufstehen! 🌟
                </Button>
              </ButtonGroup>
            </AlarmScreen>
          )}
          
          {showMiniGame && (
            <AlarmScreen
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MathGame
                difficulty="easy"
                onComplete={handleMiniGameComplete}
              />
            </AlarmScreen>
          )}
        </AnimatePresence>
      </AppContainer>
    </>
  );
}

export default App;