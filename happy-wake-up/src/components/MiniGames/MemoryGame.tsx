import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

interface MemoryGameProps {
  onComplete: (success: boolean) => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

const GameContainer = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.large};
  padding: 40px;
  text-align: center;
  border: 2px solid ${theme.colors.primary};
  box-shadow: ${theme.shadows.large};
`;

const Title = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: 32px;
  color: ${theme.colors.text};
  margin: 0 0 24px 0;
`;

const CardGrid = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 1fr);
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;
`;

const Card = styled(motion.button)<{ isFlipped: boolean; isMatched: boolean }>`
  aspect-ratio: 1;
  background: ${props => props.isFlipped || props.isMatched ? theme.colors.gradient : theme.colors.surfaceLight};
  border: 2px solid ${props => props.isMatched ? theme.colors.success : theme.colors.primary};
  border-radius: ${theme.borderRadius.medium};
  cursor: ${props => props.isMatched ? 'default' : 'pointer'};
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &:disabled {
    cursor: default;
  }
  
  ${props => props.isMatched && `
    animation: ${theme.animations.pulse};
    box-shadow: 0 0 20px ${theme.colors.success};
  `}
`;

const CardContent = styled.div<{ show: boolean }>`
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const Timer = styled.div`
  font-size: 18px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 16px;
`;

const emojis = ['🌟', '🦄', '🌈', '💎', '🌸', '🦋', '🌙', '☁️'];

export const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete, difficulty }) => {
  const gridSize = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 4 : 6;
  const pairCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  
  const [cards, setCards] = useState<string[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(difficulty === 'easy' ? 60 : difficulty === 'medium' ? 45 : 30);
  const [moves, setMoves] = useState(0);
  
  useEffect(() => {
    // Initialize cards
    const selectedEmojis = emojis.slice(0, pairCount);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    setCards(cardPairs.sort(() => Math.random() - 0.5));
  }, [pairCount]);
  
  useEffect(() => {
    if (timeLeft > 0 && matchedPairs.length < pairCount) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onComplete(false);
    }
  }, [timeLeft, matchedPairs.length, pairCount, onComplete]);
  
  useEffect(() => {
    if (matchedPairs.length === pairCount) {
      setTimeout(() => onComplete(true), 1000);
    }
  }, [matchedPairs.length, pairCount, onComplete]);
  
  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first] === cards[second]) {
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, cards[first]]);
          setFlippedIndices([]);
        }, 600);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, cards, matchedPairs]);
  
  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(index)) return;
    if (matchedPairs.includes(cards[index])) return;
    
    setFlippedIndices([...flippedIndices, index]);
    setMoves(moves + 1);
  };
  
  const isCardFlipped = (index: number) => {
    return flippedIndices.includes(index) || matchedPairs.includes(cards[index]);
  };
  
  const isCardMatched = (index: number) => {
    return matchedPairs.includes(cards[index]);
  };
  
  return (
    <GameContainer>
      <Title>Finde die Paare! 🎭</Title>
      <Timer>⏱️ {timeLeft}s | Züge: {moves}</Timer>
      
      <CardGrid size={gridSize}>
        {cards.map((emoji, index) => (
          <Card
            key={index}
            isFlipped={isCardFlipped(index)}
            isMatched={isCardMatched(index)}
            onClick={() => handleCardClick(index)}
            disabled={isCardFlipped(index) || flippedIndices.length === 2}
            whileHover={{ scale: isCardMatched(index) ? 1 : 1.05 }}
            whileTap={{ scale: isCardMatched(index) ? 1 : 0.95 }}
            animate={{
              rotateY: isCardFlipped(index) ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <CardContent show={isCardFlipped(index)}>
              {emoji}
            </CardContent>
          </Card>
        ))}
      </CardGrid>
    </GameContainer>
  );
};