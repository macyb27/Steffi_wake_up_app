import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Monster } from '../types';
import { theme } from '../styles/theme';

interface MonsterDisplayProps {
  monster: Monster;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  showMessage?: boolean;
}

const Container = styled(motion.div)<{ size: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `font-size: 48px;`;
      case 'large':
        return `font-size: 120px;`;
      default:
        return `font-size: 80px;`;
    }
  }}
`;

const MonsterEmoji = styled(motion.div)<{ rarity: string }>`
  position: relative;
  filter: drop-shadow(${theme.shadows.large});
  
  ${({ rarity }) => {
    switch (rarity) {
      case 'legendary':
        return `
          filter: drop-shadow(0 0 20px #FFD700) drop-shadow(0 0 40px #FFD700);
        `;
      case 'epic':
        return `
          filter: drop-shadow(0 0 15px #9400D3) drop-shadow(0 0 30px #9400D3);
        `;
      case 'rare':
        return `
          filter: drop-shadow(0 0 10px #00FFFF) drop-shadow(0 0 20px #00FFFF);
        `;
      default:
        return ``;
    }
  }}
`;

const MonsterName = styled.h3`
  font-family: ${theme.fonts.display};
  font-size: 20px;
  color: ${theme.colors.text};
  margin: 0;
  text-shadow: ${theme.colors.glowPink};
`;

const RarityBadge = styled.div<{ rarity: string }>`
  padding: 4px 12px;
  border-radius: ${theme.borderRadius.small};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${({ rarity }) => {
    switch (rarity) {
      case 'legendary':
        return `
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #000;
        `;
      case 'epic':
        return `
          background: linear-gradient(135deg, #9400D3, #4B0082);
          color: #FFF;
        `;
      case 'rare':
        return `
          background: linear-gradient(135deg, #00FFFF, #0080FF);
          color: #FFF;
        `;
      default:
        return `
          background: ${theme.colors.surface};
          color: ${theme.colors.textSecondary};
        `;
    }
  }}
`;

const Message = styled(motion.div)`
  background: ${theme.colors.surface};
  padding: 12px 20px;
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.primary};
  max-width: 300px;
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  margin-top: 8px;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${theme.colors.primary};
  }
`;

export const MonsterDisplay: React.FC<MonsterDisplayProps> = ({
  monster,
  size = 'medium',
  animated = true,
  showMessage = false,
}) => {
  const animationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      }
    },
  };
  
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }
  };
  
  return (
    <Container
      size={size}
      initial="hidden"
      animate="visible"
      variants={animationVariants}
    >
      <MonsterEmoji
        rarity={monster.rarity}
        animate={animated ? floatAnimation : {}}
      >
        {monster.emoji}
      </MonsterEmoji>
      
      <MonsterName>{monster.name}</MonsterName>
      
      <RarityBadge rarity={monster.rarity}>
        {monster.rarity}
      </RarityBadge>
      
      <AnimatePresence>
        {showMessage && (
          <Message
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {monster.message}
          </Message>
        )}
      </AnimatePresence>
    </Container>
  );
};