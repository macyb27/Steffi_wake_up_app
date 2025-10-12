import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import { getRandomLoveMessage, LoveMessage, personalizeMessage } from '../utils/messages';

interface LoveMessageBoxProps {
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

const Hearts = styled(motion.div)`
  position: absolute;
  font-size: 20px;
  pointer-events: none;
`;

const RefreshHint = styled.div`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: 8px;
  opacity: 0.7;
`;

export const LoveMessageBox: React.FC<LoveMessageBoxProps> = ({ userName }) => {
  const [currentMessage, setCurrentMessage] = useState<LoveMessage>(getRandomLoveMessage());
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const handleClick = () => {
    // Change message
    setCurrentMessage(getRandomLoveMessage());
    
    // Create heart animation
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 100,
      y: 100,
    };
    setHearts([...hearts, newHeart]);
    
    // Remove heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 3000);
  };
  
  // Auto-rotate messages every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(getRandomLoveMessage());
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
          💌 Nachricht für dich
        </Title>
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '24px' }}
        >
          💕
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
        Klick mich für eine neue Nachricht 💝
      </RefreshHint>
      
      <AnimatePresence>
        {hearts.map(heart => (
          <Hearts
            key={heart.id}
            initial={{ x: `${heart.x}%`, y: '50%', opacity: 1 }}
            animate={{ 
              y: '-100%',
              opacity: 0,
              x: `${heart.x + (Math.random() - 0.5) * 50}%`
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            💖
          </Hearts>
        ))}
      </AnimatePresence>
    </MessageContainer>
  );
};