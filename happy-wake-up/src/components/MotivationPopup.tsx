import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

const PopupContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${theme.colors.surface};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.large};
  padding: 20px;
  max-width: 300px;
  box-shadow: ${theme.shadows.neon};
  z-index: 500;
  backdrop-filter: blur(10px);
`;

const Emoji = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
  text-align: center;
`;

const Message = styled.p`
  font-family: ${theme.fonts.display};
  font-size: 16px;
  color: ${theme.colors.text};
  margin: 0;
  text-align: center;
  line-height: 1.5;
`;

const motivationalMessages = [
  { emoji: '🌟', message: 'Du bist ein Stern! Leuchte hell heute!' },
  { emoji: '💪', message: 'Du schaffst alles, was du dir vornimmst!' },
  { emoji: '🌈', message: 'Nach jedem Regen kommt ein Regenbogen!' },
  { emoji: '💖', message: 'Du bist geliebt und wertvoll!' },
  { emoji: '🦋', message: 'Verwandle dich heute in deine beste Version!' },
  { emoji: '✨', message: 'Magie passiert, wenn du an dich glaubst!' },
  { emoji: '🌸', message: 'Blühe auf wie eine Blume im Frühling!' },
  { emoji: '🎯', message: 'Heute triffst du ins Schwarze!' },
  { emoji: '🏆', message: 'Du bist bereits eine Gewinnerin!' },
  { emoji: '🌺', message: 'Lass deine Schönheit von innen strahlen!' },
];

export const MotivationPopup: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState<typeof motivationalMessages[0] | null>(null);
  const [lastShownIndex, setLastShownIndex] = useState(-1);
  
  useEffect(() => {
    const showRandomMessage = () => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * motivationalMessages.length);
      } while (randomIndex === lastShownIndex);
      
      setLastShownIndex(randomIndex);
      setCurrentMessage(motivationalMessages[randomIndex]);
      
      setTimeout(() => {
        setCurrentMessage(null);
      }, 5000);
    };
    
    // Show first message after 10 seconds
    const firstTimeout = setTimeout(showRandomMessage, 10000);
    
    // Then show messages every 2-5 minutes
    const interval = setInterval(() => {
      const delay = Math.random() * 180000 + 120000; // 2-5 minutes
      setTimeout(showRandomMessage, delay);
    }, 300000);
    
    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [lastShownIndex]);
  
  return (
    <AnimatePresence>
      {currentMessage && (
        <PopupContainer
          initial={{ x: 400, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 400, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Emoji>{currentMessage.emoji}</Emoji>
          <Message>{currentMessage.message}</Message>
        </PopupContainer>
      )}
    </AnimatePresence>
  );
};