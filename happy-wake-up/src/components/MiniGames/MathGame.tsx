import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Button } from '../Button';

interface MathGameProps {
  onComplete: (success: boolean) => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

const GameContainer = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.large};
  padding: 40px;
  text-align: center;
  border: 2px solid ${theme.colors.primary};
  box-shadow: ${theme.shadows.large};
`;

const Question = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: 48px;
  color: ${theme.colors.text};
  margin: 0 0 32px 0;
  background: ${theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AnswerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const AnswerButton = styled(Button)<{ correct?: boolean }>`
  font-size: 24px;
  padding: 20px;
  
  ${({ correct }) => correct !== undefined && `
    background: ${correct ? theme.colors.success : theme.colors.error};
    pointer-events: none;
  `}
`;

const Timer = styled.div`
  font-size: 18px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 16px;
`;

const Feedback = styled(motion.div)<{ correct: boolean }>`
  font-size: 24px;
  font-weight: 600;
  color: ${({ correct }) => correct ? theme.colors.success : theme.colors.error};
  margin: 16px 0;
`;

export const MathGame: React.FC<MathGameProps> = ({ onComplete, difficulty }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('+');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const generateQuestion = () => {
    let n1, n2, op, answer;
    
    switch (difficulty) {
      case 'easy':
        n1 = Math.floor(Math.random() * 10) + 1;
        n2 = Math.floor(Math.random() * 10) + 1;
        op = '+';
        answer = n1 + n2;
        break;
      case 'medium':
        n1 = Math.floor(Math.random() * 20) + 5;
        n2 = Math.floor(Math.random() * 20) + 5;
        op = Math.random() > 0.5 ? '+' : '-';
        answer = op === '+' ? n1 + n2 : n1 - n2;
        break;
      case 'hard':
        n1 = Math.floor(Math.random() * 12) + 2;
        n2 = Math.floor(Math.random() * 12) + 2;
        op = '×';
        answer = n1 * n2;
        break;
      default:
        n1 = 5;
        n2 = 5;
        op = '+';
        answer = 10;
    }
    
    setNum1(n1);
    setNum2(n2);
    setOperation(op);
    setCorrectAnswer(answer);
    
    // Generate options
    const opts = [answer];
    while (opts.length < 4) {
      const variation = Math.floor(Math.random() * 10) - 5;
      const option = answer + variation;
      if (!opts.includes(option) && option > 0) {
        opts.push(option);
      }
    }
    
    setOptions(opts.sort(() => Math.random() - 0.5));
  };
  
  useEffect(() => {
    generateQuestion();
  }, [difficulty]);
  
  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleAnswer(-1);
    }
  }, [timeLeft, showFeedback]);
  
  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    setTimeout(() => {
      onComplete(answer === correctAnswer);
    }, 1500);
  };
  
  return (
    <GameContainer
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <Timer>⏱️ {timeLeft}s</Timer>
      
      <Question>
        {num1} {operation} {num2} = ?
      </Question>
      
      <AnswerGrid>
        {options.map((option, index) => (
          <AnswerButton
            key={index}
            onClick={() => !showFeedback && handleAnswer(option)}
            correct={showFeedback ? option === correctAnswer : undefined}
            disabled={showFeedback}
            size="large"
            variant={showFeedback && option === selectedAnswer ? 
              (option === correctAnswer ? 'primary' : 'secondary') : 
              'glass'}
          >
            {option}
          </AnswerButton>
        ))}
      </AnswerGrid>
      
      <AnimatePresence>
        {showFeedback && (
          <Feedback
            correct={selectedAnswer === correctAnswer}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {selectedAnswer === correctAnswer ? '✨ Richtig! ✨' : '❌ Falsch!'}
          </Feedback>
        )}
      </AnimatePresence>
    </GameContainer>
  );
};