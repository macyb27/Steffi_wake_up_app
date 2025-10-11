import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import confetti from 'canvas-confetti';

const SecretButton = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 16, 240, 0.1);
  }
`;

const EasterEggModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.colors.surface};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.large};
  padding: 40px;
  text-align: center;
  box-shadow: ${theme.shadows.neon};
  z-index: 2000;
`;

const SecretMessage = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: 32px;
  color: ${theme.colors.primary};
  margin-bottom: 16px;
`;

const RewardEmoji = styled.div`
  font-size: 80px;
  margin: 20px 0;
  animation: ${theme.animations.bounce};
`;

export const EasterEggs: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [showKonamiReward, setShowKonamiReward] = useState(false);
  
  const KONAMI_PATTERN = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                          'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                          'b', 'a'];
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newCode = [...konamiCode, e.key].slice(-10);
      setKonamiCode(newCode);
      
      if (newCode.join(',') === KONAMI_PATTERN.join(',')) {
        triggerKonamiReward();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiCode]);
  
  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 7) {
      setShowSecret(true);
      confetti({
        particleCount: 200,
        spread: 70,
        colors: ['#FF10F0', '#00FFFF', '#FFD700'],
      });
      
      // Reset after showing
      setTimeout(() => {
        setShowSecret(false);
        setClickCount(0);
      }, 5000);
    }
  };
  
  const triggerKonamiReward = () => {
    setShowKonamiReward(true);
    
    // Epic confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF10F0', '#00FFFF', '#FFD700'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF10F0', '#00FFFF', '#FFD700'],
      });
    }, 250);
    
    setTimeout(() => {
      setShowKonamiReward(false);
      setKonamiCode([]);
    }, 5000);
  };
  
  return (
    <>
      <SecretButton
        onClick={handleSecretClick}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      />
      
      <AnimatePresence>
        {showSecret && (
          <EasterEggModal
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <SecretMessage>Du hast das Geheimnis gefunden!</SecretMessage>
            <RewardEmoji>🦄</RewardEmoji>
            <p>Legendary Monster "Unicorn Magic" freigeschaltet!</p>
          </EasterEggModal>
        )}
        
        {showKonamiReward && (
          <EasterEggModal
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <SecretMessage>KONAMI CODE AKTIVIERT!</SecretMessage>
            <RewardEmoji>👾</RewardEmoji>
            <p>+1000 Happiness Points! Du bist eine wahre Gamerin!</p>
          </EasterEggModal>
        )}
      </AnimatePresence>
    </>
  );
};