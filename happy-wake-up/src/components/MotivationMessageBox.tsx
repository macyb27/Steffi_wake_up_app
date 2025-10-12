import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import { getRandomMotivationMessage, MotivationMessage, personalizeMessage } from '../utils/messages';
import { monsters } from '../utils/monsters';

interface MotivationMessageBoxProps {
  userName: string;
}

const MessageContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 16, 240, 0.1), rgba(255, 110, 199, 0.1));
  backdrop-filter: blur(10px);
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.large};
  padding: 24px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${theme.colors.gradient};
    border-radius: ${theme.borderRadius.large};
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.neon};
  }
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  font-family: ${theme.fonts.display};
  font-size: 18px;
  color: ${theme.colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MessageText = styled(motion.p)`
  font-size: 20px;
  font-weight: 500;
  color: ${theme.colors.text};
  margin: 0;
  line-height: 1.5;
  text-align: center;
  padding: 16px 0;
`;

const MessageEmoji = styled(motion.span)`
  font-size: 48px;
  display: block;
  text-align: center;
  margin-bottom: 8px;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 24px;
  pointer-events: none;
  z-index: 10;
`;

const RefreshHint = styled.div`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: 8px;
  opacity: 0.7;
`;

const floatingIcons = ['💀', '☠️', '👻', '🦇', '🕷️', ...monsters.map(m => m.emoji)];

export const MotivationMessageBox: React.FC<MotivationMessageBoxProps> = ({ userName }) => {
  const [currentMessage, setCurrentMessage] = useState<MotivationMessage>(getRandomMotivationMessage());
  const [floatingElements, setFloatingElements] = useState<{ id: number; icon: string; x: number; y: number }[]>([]);
  
  const handleClick = () => {
    // Change message
    setCurrentMessage(getRandomMotivationMessage());
    
    // Create floating animation with random icon
    const randomIcon = floatingIcons[Math.floor(Math.random() * floatingIcons.length)];
    const newElement = {
      id: Date.now(),
      icon: randomIcon,
      x: Math.random() * 100,
      y: 100,
    };
    setFloatingElements([...floatingElements, newElement]);
    
    // Remove element after animation
    setTimeout(() => {
      setFloatingElements(prev => prev.filter(e => e.id !== newElement.id));
    }, 3000);
  };
  
  // Auto-rotate messages every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(getRandomMotivationMessage());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <MessageContainer
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <MessageHeader>
        <Title>
          ⚡ Motivation für dich
        </Title>
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '24px' }}
        >
          🎯
        </motion.span>
      </MessageHeader>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {currentMessage.emoji && (
            <MessageEmoji
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {currentMessage.emoji}
            </MessageEmoji>
          )}
          <MessageText>
            {personalizeMessage(currentMessage.text, userName)}
          </MessageText>
        </motion.div>
      </AnimatePresence>
      
      <RefreshHint>
        Klick mich für neue Motivation 💪
      </RefreshHint>
      
      <AnimatePresence>
        {floatingElements.map(element => (
          <FloatingIcon
            key={element.id}
            initial={{ x: `${element.x}%`, y: '50%', opacity: 1, scale: 1 }}
            animate={{ 
              y: '-100%',
              opacity: 0,
              x: `${element.x + (Math.random() - 0.5) * 50}%`,
              scale: [1, 1.5, 0.5],
              rotate: [0, 360, 720]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            {element.icon}
          </FloatingIcon>
        ))}
      </AnimatePresence>
    </MessageContainer>
  );
};